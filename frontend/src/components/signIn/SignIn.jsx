import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, message,  Space } from "antd";
import { useSignInMutation } from "../../context/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../context/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [signIn, { isLoading, isError, data, isSuccess }] = useSignInMutation();
  let isLogin = useSelector((state) => state.auth.token);
  

  useEffect(() => {
    if (isSuccess || isLogin) {
      dispatch(setToken(data?.payload?.token));
      message.success("Welcome to dashboard");   
      navigate("/admin/blogManage");
    }
    if (isError) {
      message.error("Username or password is incorrect");   
      
    }
  }, [isSuccess, isError, isLogin]);

  const onFinish = (values) => {
    signIn(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-4 max-sm:p-4 ">
      <h2 className="text-2xl font-medium">Sign in</h2>
      <Form
        layout="vertical"
        name="basic"
        className="w-96"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username : iskandar2007" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password : iskandar2007" />
        </Form.Item>

        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignIn;
