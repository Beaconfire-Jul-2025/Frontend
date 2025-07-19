import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';

const InviteNewEmployee: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { email: string }) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success(`Invitation sent to ${values.email}`);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <h2>Invite New Employee</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Employee Email"
          name="email"
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter employee email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send Invitation
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InviteNewEmployee;
