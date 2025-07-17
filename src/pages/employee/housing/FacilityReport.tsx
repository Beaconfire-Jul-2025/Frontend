import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, List, Modal, message, Tooltip } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';

dayjs.extend(relativeTime);

// Types
interface CommentType {
  commentId: number;
  description: string;
  createdBy: string;
  commentDate: string;
}

interface ReportType {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  reportDate: string;
  status: string;
  comments: CommentType[];
}

interface FacilityReportResponse {
  list: ReportType[];
  current: number;
  pageSize: number;
  total: number;
}

const FacilityReport: React.FC = () => {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [editingComment, setEditingComment] = useState<CommentType | null>(
    null,
  );

  // Fetch reports
  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/composite/facility-report');
      const data: FacilityReportResponse = await res.json();
      setReports(data.list);
    } catch (_err) {
      message.error('Failed to fetch facility reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Create new report
  const handleCreateReport = async (values: any) => {
    try {
      await fetch('/api/composite/facility-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('Report submitted');
      setShowReportModal(false);
      fetchReports();
    } catch {
      message.error('Failed to submit report');
    }
  };

  // Add or update comment
  const handleComment = async (values: any) => {
    if (!selectedReport) return;
    try {
      if (editingComment) {
        // Update comment
        await fetch(
          `/api/composite/facility-report/${selectedReport.id}/comment/${editingComment.commentId}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          },
        );
        message.success('Comment updated');
      } else {
        // Add comment
        await fetch(
          `/api/composite/facility-report/${selectedReport.id}/comment`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          },
        );
        message.success('Comment added');
      }
      setShowCommentModal(false);
      setEditingComment(null);
      fetchReports();
    } catch {
      message.error('Failed to submit comment');
    }
  };

  // Render comments
  const renderComments = (comments: CommentType[], report: ReportType) => (
    <List
      dataSource={comments}
      locale={{ emptyText: 'No comments yet.' }}
      renderItem={(item) => (
        <List.Item>
          <Card style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <b>{item.createdBy}</b>
                <div>{item.description}</div>
              </div>
              <div>
                <Tooltip
                  title={dayjs(item.commentDate).format('YYYY-MM-DD HH:mm')}
                >
                  <span>{dayjs(item.commentDate).fromNow()}</span>
                </Tooltip>
              </div>
            </div>
            {item.createdBy === 'me' && (
              <Button
                key={item.commentId}
                type="link"
                size="small"
                onClick={() => {
                  setSelectedReport(report);
                  setEditingComment(item);
                  setShowCommentModal(true);
                }}
              >
                Edit
              </Button>
            )}
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <Card
        title="Facility Reports"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowReportModal(true)}
          >
            Report Issue
          </Button>
        }
      >
        <List
          loading={loading}
          dataSource={reports}
          locale={{ emptyText: 'No facility reports found.' }}
          renderItem={(report) => (
            <Card style={{ marginBottom: 16 }}>
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <p>
                <b>Reported By:</b> {report.createdBy}
              </p>
              <p>
                <b>Date:</b>{' '}
                {dayjs(report.reportDate).format('YYYY-MM-DD HH:mm')}
              </p>
              <p>
                <b>Status:</b> {report.status}
              </p>
              <div style={{ marginTop: 16 }}>
                <b>Comments:</b>
                {renderComments(report.comments, report)}
                <Button
                  type="link"
                  onClick={() => {
                    setSelectedReport(report);
                    setEditingComment(null);
                    setShowCommentModal(true);
                  }}
                >
                  Add Comment
                </Button>
              </div>
            </Card>
          )}
        />
      </Card>

      {/* New Report Modal */}
      <Modal
        title="Report Facility Issue"
        open={showReportModal}
        onCancel={() => setShowReportModal(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCreateReport}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            {' '}
            <Input />{' '}
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            {' '}
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="facilityType"
            label="Facility Type"
            rules={[{ required: true }]}
          >
            {' '}
            <Input />{' '}
          </Form.Item>
          {/* employeeId and houseId should be filled by backend/session */}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>

      {/* Comment Modal */}
      <Modal
        title={editingComment ? 'Edit Comment' : 'Add Comment'}
        open={showCommentModal}
        onCancel={() => {
          setShowCommentModal(false);
          setEditingComment(null);
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleComment}
          initialValues={
            editingComment ? { description: editingComment.description } : {}
          }
        >
          <Form.Item
            name="description"
            label="Comment"
            rules={[{ required: true }]}
          >
            {' '}
            <Input.TextArea rows={3} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingComment ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default FacilityReport;
