import { useState } from "react";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { message, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth.ts";

interface LoginFormData {
  username: string;
  password: string;
  autoLogin?: boolean;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginFormData) => {
    setLoading(true);

    try {
      const response = await login({
        username: values.username,
        password: values.password,
      });

      const { token: authToken, user: userData } = response;

      // Store auth data
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(userData));

      message.success("Login successful!");

      // Redirect based on the role
      if (userData.role === "ROLE_HR") {
        navigate("/hr");
      } else {
        navigate("/employee/onboarding");
      }
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        style={{
          backgroundColor: token.colorBgContainer,
        }}
      >
        <LoginForm
          logo={
            <LoginOutlined
              style={{ fontSize: "32px", color: token.colorPrimary }}
            />
          }
          title="Welcome Back"
          subTitle="Please sign in to your account"
          loading={loading}
          onFinish={handleLogin}
          submitter={{
            searchConfig: {
              submitText: "Sign In",
            },
            submitButtonProps: {
              size: "large",
              style: {
                width: "100%",
                height: "48px",
                borderRadius: token.borderRadiusLG,
                fontSize: "16px",
                fontWeight: 600,
              },
            },
            resetButtonProps: {
              style: {
                display: "none",
              },
            },
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className="text-gray-400" />,
              style: {
                borderRadius: token.borderRadiusLG,
              },
            }}
            placeholder="Username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                min: 2,
                message: "Username must be at least 2 characters",
              },
            ]}
          />

          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className="text-gray-400" />,
              style: {
                borderRadius: token.borderRadiusLG,
              },
            }}
            placeholder="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          />
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default LoginPage;
