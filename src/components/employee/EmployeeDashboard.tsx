import React from 'react';
import {Typography} from 'antd';
import Layout from '../common/Layout';

const {Title} = Typography;

const EmployeeDashboard: React.FC = () => {
    return (
        <Layout title="Employee Dashboard">
            <div className="space-y-6">
                <Title>Employee Dashboard</Title>
            </div>
        </Layout>
    );
};

export default EmployeeDashboard;