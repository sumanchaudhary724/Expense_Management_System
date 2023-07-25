import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { loginUser } from "../../axiosHelper";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const response = await loginUser(values);

      if (response.status === "success") {
        message.success("Login Successful");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...response.user, password: "" })
        );
        navigate("/");
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
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">Not a user? Click here to register</Link>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
