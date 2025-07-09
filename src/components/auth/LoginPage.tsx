import type {CSSProperties} from 'react';
import {useState} from 'react';
import {LockOutlined, LoginOutlined, UserOutlined} from '@ant-design/icons';
import {LoginForm, ProConfigProvider, ProFormCheckbox, ProFormText, setAlpha,} from '@ant-design/pro-components';
import {message, theme} from 'antd';
import {useNavigate} from 'react-router-dom';
import {login} from '../../api/auth';

interface LoginFormData {
    username: string;
    password: string;
    autoLogin?: boolean;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const {token} = theme.useToken();
    const [loading, setLoading] = useState(false);

    const iconStyles: CSSProperties = {
        marginInlineStart: '16px',
        color: setAlpha(token.colorTextBase, 0.2),
        fontSize: '24px',
        verticalAlign: 'middle',
        cursor: 'pointer',
    };

    const handleLogin = async (values: LoginFormData) => {
        setLoading(true);

        try {
            const response = await login({
                username: values.username,
                password: values.password,
            });

            const {token: authToken, user: userData} = response;

            // Store auth data
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('user', JSON.stringify(userData));

            message.success('Login successful!');

            // Redirect based on role
            if (userData.role === 'HR') {
                navigate('/hr-dashboard');
            } else {
                navigate('/employee-dashboard');
            }

        } catch (error) {
            message.error('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <ProConfigProvider hashed={false}>
                <div
                    style={{
                        backgroundColor: token.colorBgContainer,
                        borderRadius: token.borderRadiusLG,
                        boxShadow: token.boxShadowTertiary,
                        padding: '32px',
                        minWidth: '400px',
                        maxWidth: '480px',
                        width: '100%'
                    }}
                >
                    <LoginForm
                        logo={<LoginOutlined style={{fontSize: '32px', color: token.colorPrimary}}/>}
                        title="Welcome Back"
                        subTitle="Please sign in to your account"
                        loading={loading}
                        onFinish={handleLogin}
                        submitter={{
                            searchConfig: {
                                submitText: 'Sign In',
                            },
                            render: (_, dom) => dom.pop(),
                            submitButtonProps: {
                                size: 'large',
                                style: {
                                    width: '100%',
                                    height: '48px',
                                    borderRadius: token.borderRadiusLG,
                                    fontSize: '16px',
                                    fontWeight: 600,
                                },
                            },
                        }}
                    >
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className="text-gray-400"/>,
                                style: {
                                    borderRadius: token.borderRadiusLG,
                                },
                            }}
                            placeholder="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                {
                                    min: 2,
                                    message: 'Username must be at least 2 characters',
                                },
                            ]}
                        />

                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className="text-gray-400"/>,
                                style: {
                                    borderRadius: token.borderRadiusLG,
                                },
                            }}
                            placeholder="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            ]}
                        />

                        <div
                            style={{
                                marginBlockEnd: 24,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <ProFormCheckbox noStyle name="autoLogin">
                <span style={{color: token.colorTextSecondary}}>
                  Remember me
                </span>
                            </ProFormCheckbox>
                            <a
                                style={{
                                    color: token.colorPrimary,
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.textDecoration = 'underline';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.textDecoration = 'none';
                                }}
                            >
                                Forgot password?
                            </a>
                        </div>
                    </LoginForm>
                </div>
            </ProConfigProvider>
        </div>
    );
};

export default LoginPage;