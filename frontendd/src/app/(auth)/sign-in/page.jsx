"use client";
import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth.js";

const App = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const { signIn, user } = useAuth();
  const onFinish = async (values) => {
    const { username, email, password } = values;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}api/sign-in`,
        {
          email: email,
          password: password,
        }
      );
      setIsLoading(false);
      const token = response.data.token;

      signIn(token);
      router.push("/");

      console.log(token);
    } catch (error) {
      setIsLoading(false);

      toast(error.response.data, {
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
    <div className="flex min-h-screen justify-center items-center bg-white">
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
          <h1 className="text-center text-lg ">Sign in</h1>
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
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} block type="primary" htmlType="submit">
            Log in
          </Button>
          or{" "}
          <Link href="/sign-up" className="text-blue-600">
            Register now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;
