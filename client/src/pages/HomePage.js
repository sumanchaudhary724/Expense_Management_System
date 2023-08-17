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
  DatePicker,
} from "antd";
import Layout from "../components/Layout/Layout";
import {
  postTransection,
  getAllTransections,
  deleteTransections,
  updateTransections,
  getFilterTransection,
} from "../axiosHelper";
import Spinner from "../components/Spinner";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transections, setTransections] = useState([]); // Initialize transections state as an empty array
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");

  const handleEdit = (transaction) => {
    setEditModalVisible(true);
    setCurrentTransaction(transaction);
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await updateTransections(currentTransaction._id, {
        ...values,
        userid: user._id,
      });
      setLoading(false);

      if (response.status === "success") {
        message.success("Transaction updated successfully");
        setEditModalVisible(false);
        setCurrentTransaction(null);
        // Update the state by fetching the latest transactions
        fetchTransections();
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

  // Function to delete a transaction
  const handleDelete = async (transactionId) => {
    try {
      setLoading(true);
      const response = await deleteTransections(transactionId);
      setLoading(false);

      if (response.status === "success") {
        message.success("Transaction deleted successfully");
        // Update the state by filtering out the deleted transaction
        setTransections((prevTransactions) =>
          prevTransactions.filter((item) => item._id !== transactionId)
        );
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
        <Button onClick={() => handleEdit(item)} type="primary">
          Edit
        </Button>
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
      const response = await getAllTransections(user._id);
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
  }, [frequency, selectedDate, type]);

  //Form handling
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await postTransection({ ...values, userid: user._id });
      setLoading(false);
      if (response.status === "success") {
        message.success("Transaction added successfully");
        setShowModal(false);
        // Update the state by fetching the latest transactions
        fetchTransections();
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

  //Form handling
  const handleFilter = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await getFilterTransection({
        ...values,
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setLoading(false);
      if (response.status === "success") {
        message.success("Filtered transaction successfully");
        setShowModal(false);
        // Update the state by fetching the latest transactions
        fetchTransections();
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
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div className="filter-tab ">
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>
        <button className="btn btn-primary" onClick={handleFilter}>
          Apply filter
        </button>
      </div>
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
        title={currentTransaction ? "Edit Transaction" : "Add Transaction"}
        open={showModal || editModalVisible}
        onCancel={() => {
          setShowModal(false);
          setEditModalVisible(false);
          setCurrentTransaction(null);
        }}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={currentTransaction ? handleEditSubmit : handleSubmit}
        >
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
              {currentTransaction ? "UPDATE" : "SAVE"}
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
