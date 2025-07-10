import { useState, useEffect } from 'react';
import { Card, Typography, List, Divider, Input, Button, Space, Modal, Form, Spin, message } from 'antd';
import Layout from '../common/Layout';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TextArea } = Input;

const EmployeeFacilityReportDetails = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([
        {
            title: 'Broken Heater',
            description: 'The heater in the living room is not working.',
            createdBy: 'Alice',
            reportDate: '2025-07-07',
            status: 'Open',
            comments: [
                {
                    description: 'We are sending someone to fix it.',
                    createdBy: 'HR',
                    commentDate: '2025-07-08',
                },
            ],
            newComment: '',
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReport, setNewReport] = useState({ title: '', description: '' });

    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                // TODO: Replace with real api calls
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Example API call:
                // const res = await fetch(`/api/reports/${id}`);
                // const data = await res.json();
                // setReports([data]);
            } catch (err) {
                console.error(err);
                message.error('Failed to load report data.');
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [id]);

    const handleAddComment = async (index: number) => {
        const updatedReports = [...reports];
        const report = updatedReports[index];
        const newCommentText = report.newComment.trim();
        if (newCommentText) {
            try {
                // TODO: Replace with real api calls
                // Simulate API call to add comment
                await new Promise((resolve) => setTimeout(resolve, 500));
                // const res = await fetch(`/api/reports/${reportId}/comments`, {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ description: newCommentText }),
                // });
                // const newComment = await res.json();

                const newComment = {
                    description: newCommentText,
                    createdBy: 'You',
                    commentDate: new Date().toISOString().split('T')[0],
                };
                report.comments.push(newComment);
                report.newComment = '';
                setReports(updatedReports);
            } catch (error) {
                console.log(error);
                message.error('Failed to add comment.');
            }
        }
    };

    return (
        <Layout title="Facility Reports">

            <Modal
                title="Report an Issue"
                open={isModalOpen}
                onOk={() => {
                    if (newReport.title && newReport.description) {
                        setReports([
                            {
                                ...newReport,
                                createdBy: 'You',
                                reportDate: new Date().toISOString().split('T')[0],
                                status: 'Open',
                                comments: [],
                                newComment: '',
                            },
                            ...reports,
                        ]);
                        setNewReport({ title: '', description: '' });
                        setIsModalOpen(false);
                    }
                }}
                onCancel={() => setIsModalOpen(false)}
                okText="Submit"
            >
                <Form layout="vertical">
                    <Form.Item label="Title" required>
                        <Input value={newReport.title} onChange={(e) => setNewReport({ ...newReport, title: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Description" required>
                        <TextArea
                            rows={4}
                            value={newReport.description}
                            onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            {loading ? (
                <Spin />
            ) : (
                <div className="space-y-6">
                    {reports.map((report, index) => (
                        <Card key={index} title={report.title}>
                            <Text>{report.description}</Text>
                            <Divider />
                            <Text type="secondary">Reported by {report.createdBy} on {report.reportDate}</Text><br />
                            <Text>Status: {report.status}</Text>
                            <Divider />
                            <Title level={5}>Comments</Title>
                            <List
                                dataSource={report.comments}
                                renderItem={(comment, i) => (
                                    <List.Item key={i}>
                                        <Space direction="vertical">
                                            <Text>{comment.description}</Text>
                                            <Text type="secondary">By {comment.createdBy} on {comment.commentDate}</Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                            <Divider />
                            <TextArea
                                rows={2}
                                placeholder="Add a comment..."
                                value={report.newComment}
                                onChange={(e) => {
                                    const updated = [...reports];
                                    updated[index].newComment = e.target.value;
                                    setReports(updated);
                                }}
                            />
                            <Button
                                type="primary"
                                onClick={() => handleAddComment(index)}
                                style={{ marginTop: 8 }}
                            >
                                Add Comment
                            </Button>

                            <Button onClick={() => navigate('/employee/housing')} style={{ marginLeft : 10 }}>
                                Back to Housing
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default EmployeeFacilityReportDetails;