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
  const [transections, setTransections] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

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
        fetchTransections();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  const handleFilter = async () => {
    try {
      let startDate = null;
      let endDate = null;

      if (frequency === "custom") {
        startDate = selectedDate[0].format("YYYY-MM-DD");
        endDate = selectedDate[1].format("YYYY-MM-DD");
      }

      const response = await getFilterTransection({
        frequency,
        type,
        startDate,
        endDate,
      });

      setFilteredTransactions(response.data);
    } catch (error) {
      console.error("Error filtering transactions:", error);
    }
  };

  const fetchTransections = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getAllTransections(user._id);
      setLoading(false);

      if (response.status === "success") {
        setTransections(response.transections);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching transactions:", error);
      message.error("Error fetching transactions.");
    }
  };

  useEffect(() => {
    fetchTransections();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await postTransection({ ...values, userid: user._id });
      setLoading(false);
      if (response.status === "success") {
        message.success("Transaction added successfully");
        setShowModal(false);
        fetchTransections();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  const tableData = filteredTransactions.map((item, i) => ({
    key: item._id,
    SN: i + 1,
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

  const columns = [
    {
      title: "SN",
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
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const handleDelete = async (transactionId) => {
    try {
      setLoading(true);
      const response = await deleteTransections(transactionId);
      setLoading(false);

      if (response.status === "success") {
        message.success("Transaction deleted successfully");
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
              onChange={(values) => setSelectedDate(values)}
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
        <Button type="primary" onClick={handleFilter}>
          Filter Transactions
        </Button>
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
