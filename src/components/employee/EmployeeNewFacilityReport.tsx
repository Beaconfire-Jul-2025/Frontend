import { useState } from 'react';
import { Button, Form, Input, message, Card } from 'antd';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const EmployeeNewFacilityReport = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { title: string; description: string }) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      // TODO: Replace with actual API call:
      // await fetch('/api/reports', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });

      message.success('Facility issue reported successfully!');
      navigate('/employee/housing');
    } catch (error) {
      message.error('Failed to report issue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Report an Issue">
      <div className="space-y-6" style={{ marginTop: 32 }}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input placeholder="e.g., Broken heater in bedroom" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter a description' }]}
            >
              <TextArea rows={4} placeholder="Provide details of the issue" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 8 }}>
                Submit
              </Button>
              <Button onClick={() => navigate('/employee/housing')} disabled={loading}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployeeNewFacilityReport;