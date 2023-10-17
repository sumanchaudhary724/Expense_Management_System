import React from "react";
import { Progress, Row, Col, Card } from "antd";

const Analytics = ({ allTransection }) => {
  // category
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  // total transaction
  const totalTransaction = allTransection.length;
  const totalIncomeTransaction = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransaction = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  //total turnover
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <Row className="AnalyticsContainer" gutter={16}>
        <Col span={6}>
          <Card title="Total Transactions">
            <div className="card-content">
              {/* Card content for Total Transactions */}
              <p>Total Transactions: {totalTransaction}</p>
              <h5>Income: {totalIncomeTransaction.length}</h5>
              <h5>Expense: {totalExpenseTransaction.length}</h5>
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomePercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2 mt-3"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Total Turnover">
            <div className="card-content">
              {/* Card content for Total Turnover */}
              <p>Total Turnover: {totalTurnover}</p>
              <h5>Income: {totalIncomeTurnover}</h5>
              <h5>Expense: {totalExpenseTurnover}</h5>
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomeTurnoverPercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2 mt-3"
                percent={totalExpenseTurnoverPercent.toFixed(0)}
              />
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Category-wise Income">
            <div className="card-content">
              {/* Card content for Category-wise Income */}
              {categories.map((category) => {
                const amount = allTransection
                  .filter(
                    (transaction) =>
                      transaction.type === "income" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);
                return (
                  amount > 0 && (
                    <div className="category-card" key={category}>
                      <h5>{category.toUpperCase()}</h5>
                      <Progress
                        percent={((amount / totalIncomeTurnover) * 100).toFixed(
                          0
                        )}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Category-wise Expense">
            <div className="card-content">
              {/* Card content for Category-wise Expense */}
              {categories.map((category) => {
                const amount = allTransection
                  .filter(
                    (transaction) =>
                      transaction.type === "expense" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);
                return (
                  amount > 0 && (
                    <div className="category-card" key={category}>
                      <h5>{category.toUpperCase()}</h5>
                      <Progress
                        percent={(
                          (amount / totalExpenseTurnover) *
                          100
                        ).toFixed(0)}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Analytics;
