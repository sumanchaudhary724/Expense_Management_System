import React from "react";
import { Progress } from "antd";

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
      <div className="row m-3">
        <div className="col-md-3">
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
                className="mx-2 mt-3"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-header">Total Turnover: {totalTurnover}</div>
            <div className="card-body">
              <h5>Income: {totalIncomeTurnover}</h5>
         
            <div>
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
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <h6 className="bg-dark p-2 text-light">Category wise Income</h6>
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
              <div className="card mt-2">
                <div className="card-body">
                  <h5>{category.toUpperCase()}</h5>
                  <Progress
                    percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                  />
                </div>
              </div>
            )
          );
        })}
      </div>
      <div className="col-md-3">
        <h6 className="bg-warning p-2 text-light">Categorywise Expense</h6>
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
              <div className="card mt-2">
                <div className="card-body">
                  <h6>{category.toUpperCase()}</h6>
                  <Progress
                    percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                  />
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default Analytics;
