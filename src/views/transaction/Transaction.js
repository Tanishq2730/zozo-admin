import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import DataTable from "react-data-table-component";

const Transaction = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");

  // Dummy transactions data
  const transactions = [
    { id: 1, date: "2025-03-01", user: "Tanishq", amount: 5000, method: "UPI", status: "Success" },
    { id: 2, date: "2025-03-02", user: "Rahul", amount: 2000, method: "Credit Card", status: "Pending" },
    { id: 3, date: "2025-03-03", user: "Priya", amount: 1500, method: "Debit Card", status: "Failed" },
    { id: 4, date: "2025-03-04", user: "Amit", amount: 8000, method: "Net Banking", status: "Success" },
    { id: 5, date: "2025-03-01", user: "Sonia", amount: 3000, method: "UPI", status: "Success" },
  ];

  // Get unique payment methods
  const paymentMethods = [...new Set(transactions.map(txn => txn.method))];

  // Filter transactions based on selected date & method
  const filteredTransactions = transactions.filter((txn) => {
    const dateMatch = selectedDate ? txn.date === selectedDate.toISOString().split("T")[0] : true;
    const methodMatch = selectedMethod ? txn.method === selectedMethod : true;
    return dateMatch && methodMatch;
  });

  // Calculate total amount
  const totalAmount = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0);

  // Define table columns
  const columns = [
    { name: "#", selector: (row, index) => index + 1, sortable: true, width: "70px" },
    { name: "Date", selector: (row) => row.date, sortable: true },
    { name: "User", selector: (row) => row.user, sortable: true },
    { name: "Amount (₹)", selector: (row) => `₹${row.amount}`, sortable: true },
    { name: "Payment Method", selector: (row) => row.method, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  return (
    <div className="container mt-4">
      {/* Total Transaction Card */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white transactioncard p-3">
            <h4>Total Transaction Amount</h4>
            <h2 className="mb-0">₹{totalAmount}</h2>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Select Date</label>
          <div className="input-group">
            <DatePicker
              className="form-control"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              isClearable
            />
            <span className="input-group-text">
              <FaCalendarAlt />
            </span>
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">Filter by Payment Method</label>
          <select className="form-select" value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
            <option value="">All Methods</option>
            {paymentMethods.map((method, index) => (
              <option key={index} value={method}>{method}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Table using React Data Table */}
      <DataTable
        columns={columns}
        data={filteredTransactions}
        pagination
        highlightOnHover
        striped
        responsive
        className="mt-3"
      />
    </div>
  );
};

export default Transaction;
