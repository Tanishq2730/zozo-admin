import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'

const Deliver = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [data] = useState([
    {
      id: 1,
      productName: 'Product A',
      userName: 'User 1',
      productPrice: 'Rs100',
      address: '123 Street, City',
      status: 'Delivered',
      date: '2025-03-06',
    },
    {
      id: 2,
      productName: 'Product B',
      userName: 'User 2',
      productPrice: 'Rs200',
      address: '456 Avenue, City',
      status: 'Delivered',
      date: '2025-03-05',
    },
    {
      id: 3,
      productName: 'Product C',
      userName: 'User 3',
      productPrice: 'Rs150',
      address: '789 Boulevard, City',
      status: 'Delivered',
      date: '2025-03-06',
    },
  ])

  const filteredData = selectedDate
    ? data.filter((item) => item.date === selectedDate.toISOString().split('T')[0])
    : data

  const columns = [
    { name: 'Product Name', selector: (row) => row.productName, sortable: true },
    { name: 'User Name', selector: (row) => row.userName, sortable: true },
    { name: 'Product Price', selector: (row) => row.productPrice, sortable: true },
    { name: 'Address', selector: (row) => row.address },
    { name: 'Status', selector: (row) => row.status },
    { name: 'Date', selector: (row) => row.date, sortable: true },
  ]

  return (
    <div className="container mt-4">
      <div className="maincard">
        <h2 className='mb-4'>Delivered Products</h2>
        <div className="mb-3">
          <label>Select Date: </label>
          <div className="input-group">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Select a date"
            />
            <span className="input-group-text">
              <FaCalendarAlt />
            </span>
          </div>
        </div>
        <div className="card p-0">
          <DataTable columns={columns} data={filteredData} pagination highlightOnHover responsive />
        </div>
      </div>
    </div>
  )
}

export default Deliver
