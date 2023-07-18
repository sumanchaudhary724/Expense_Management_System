import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { postUser } from "../axiosHelper";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout/Layout";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const response = await postUser(values);

      if (response.status === "success") {
        message.success("Registration Successful");
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already Registered? Click Here To Login</Link>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
