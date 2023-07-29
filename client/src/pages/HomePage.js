import React, { useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import Layout from "../components/Layout/Layout";
import { postTransection } from "../axiosHelper";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  //Form handling
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await postTransection({ ...values, userid: user._id });
      setLoading(false);
      if (response.status === "success") {
        message.success("Transection Successfully");
        setShowModal(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="filters">Range filters</div>
      {loading && <Spinner />}
      <div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New
        </button>
      </div>
      <div className="content"></div>
      <Modal
        title="Add Transection"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
