import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  message,
  Table,
  Space,
  Button,
} from "antd";
import Layout from "../components/Layout/Layout";
import {
  postTransection,
  getTransections,
  deleteTransections,
} from "../axiosHelper";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transections, setTransections] = useState([]); // Initialize transections state as an empty array

  // Function to delete a transaction
  const handleDelete = async (transactionId) => {
    try {
      setLoading(true);
      const response = await deleteTransections(transactionId);
      setLoading(false);

      if (response.status === "success") {
        message.success("Transaction deleted successfully");
        fetchTransections(); // Refresh the transactions after deletion
      } else {
        message.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong while deleting the transaction.");
    }
  };

  // Calculate tableData using the transections state
  const tableData = transections.map((item, i) => ({
    key: item._id,
    SN: i + 1, // Add the SN (expense ID number) starting from 1
    date: item.date,
    amount: item.amount,
    type: item.type,
    category: item.category,
    reference: item.reference,
    description: item.description,
    actions: (
      <Space size="middle">
        {/* <Button onClick={() => handleEdit(item)}>Edit</Button> */}
        <Button onClick={() => handleDelete(item._id)} danger>
          Delete
        </Button>
      </Space>
    ),
  }));

  // table data
  const columns = [
    {
      title: "SN", // Display the SN (expense ID number) as a column
      dataIndex: "SN",
      key: "SN",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  // Function to fetch transaction data
  const fetchTransections = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getTransections(user._id);
      setLoading(false);

      console.log("API response:", response); // Log the API response

      if (response.status === "success") {
        const transectionsArray = response.transections; // Extract the 'transections' array from the response
        setTransections(transectionsArray); // Update the 'transections' state with the extracted array
        console.log("Transections array:", transectionsArray);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching transactions:", error);
      message.error("Error fetching transactions.");
    }
  };

  // Use useEffect to fetch transaction data when the component mounts
  useEffect(() => {
    fetchTransections();
  }, []);

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
        window.location.reload();
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
      <div className="content">
        <Table
          columns={[
            ...columns,
            { title: "Actions", dataIndex: "actions", key: "actions" },
          ]}
          dataSource={tableData}
        />
      </div>
      <Modal
        title="Add Transaction"
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
