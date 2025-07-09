import React from 'react';
import {Typography} from 'antd';
import Layout from '../common/Layout';

const {Title} = Typography;

const HRDashboard: React.FC = () => {
    return (
        <Layout title="HR Dashboard">
            <div className="space-y-6">
                <Title>HR Dashboard</Title>
            </div>
        </Layout>
    );
};

export default HRDashboard;