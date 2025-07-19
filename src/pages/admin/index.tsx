// User management admin page

import { Button, Form, Input, Modal, message, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const fetchUsers = async () => {
  const res = await fetch('/api/composite/auth/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

const createUser = async (username: string, password: string) => {
  const res = await fetch('/api/composite/auth/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
};

const updateUserRole = async (userId: string, role: string) => {
  const res = await fetch(`/api/composite/auth/users/${userId}/role`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error('Failed to update role');
  return res.json();
};

const AdminUserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (_e) {
      message.error('Failed to load users');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const values = await form.validateFields();
      await createUser(values.username, values.password);
      message.success('User created');
      setModalVisible(false);
      form.resetFields();
      loadUsers();
    } catch (_e) {
      message.error('Failed to create user');
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await updateUserRole(userId, role);
      message.success('Role updated');
      loadUsers();
    } catch (_e) {
      message.error('Failed to update role');
    }
  };

  const columns = [
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, record: any) => (
        <Select
          value={role}
          style={{ width: 120 }}
          onChange={(newRole) => handleRoleChange(record.userId, newRole)}
        >
          <Option value="admin">admin</Option>
          <Option value="user">user</Option>
          <Option value="hr">hr</Option>
        </Select>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add New Account
        </Button>
      </div>
      <Table
        rowKey="userId"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={false}
      />
      <Modal
        title="Add New Account"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleAddUser}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            {' '}
            <Input />{' '}
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            {' '}
            <Input.Password />{' '}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUserPage;
