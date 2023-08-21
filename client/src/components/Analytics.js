import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransection }) => {
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

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            Total Transactions: {totalTransaction}
          </div>
          <div className="card-body">
            <h5>Income: {totalIncomeTransaction.length}</h5>
            <h5>Expense: {totalExpenseTransaction.length}</h5>
          </div>
          <div>
            <Progress
              type="circle"
              strokeColor={"green"}
              className="mx-2"
              percent={totalIncomePercent.toFixed(0)}
            />
            <Progress
              type="circle"
              strokeColor={"red"}
              className="mx-2"
              percent={totalExpensePercent.toFixed(0)}
            />
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">Transaction Percentage</div>
          <div className="card-body">
            <h5>Income Percentage: {totalIncomePercent.toFixed(2)}%</h5>
            <h5>Expense Percentage: {totalExpensePercent.toFixed(2)}%</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
