"use client";
import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const App = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const onFinish = async (values) => {
    const { username, email, password } = values;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}api/sign-up`,
        {
          username: username,
          email: email,
          password: password,
        }
      );
      setIsLoading(false);

      router.push("/sign-in");

      console.log(response);
    } catch (error) {
      setIsLoading(false);

      toast(error.message, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      console.error(error);
    }

    console.log("Received values of form: ", values);
  };
  return (
    <div className="flex min-h-screen justify-center items-center ">
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
          width: "100%",
          padding: 20,
        }}
        onFinish={onFinish}
      >
        <Form.Item>
          <h1 className="text-center text-lg ">Sign Up</h1>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} block type="primary" htmlType="submit">
            Sign up
          </Button>
          or{" "}
          <Link href="/sign-in" className="text-blue-600">
            Login now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;
