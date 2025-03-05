import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

const Order = () => {
  const [searchText, setSearchText] = useState('')
  const [visible, setVisible] = useState(false)

  const [data, setData] = useState([
    {
      id: 101,
      customerName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      orderDate: '01/15/2025',
      productName: 'A2 Milk',
      quantity: 2,
      status: 'Delivered',
      paymentStatus: 'Paid',
      amount: '₹250.00',
      shippingStatus: 'Completed',
    },
  ])

  // ✅ Form Fields ke liye State
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    orderDate: '',
    productName: '',
    quantity: '',
    status: '',
    paymentStatus: '',
    shippingStatus: '',
  })

  // ✅ Form ke Input ko Handle Karne ka function
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ✅ Form Submit karne ka function
  const handleSubmit = () => {
    const newOrder = {
      id: data.length + 101, // ✅ Unique ID generate karna
      ...form,
      amount: `₹${(form.quantity * 125).toFixed(2)}`, // Example: ₹125 per quantity
    }
    setData([...data, newOrder]) // ✅ Table mai naya order add karna
    setVisible(false) // ✅ Modal close karna
    setForm({
      // ✅ Form reset karna
      customerName: '',
      email: '',
      phone: '',
      orderDate: '',
      productName: '',
      quantity: '',
      status: '',
      paymentStatus: '',
      shippingStatus: '',
    })
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase())
  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const filteredData = data.filter(
    (item) =>
      item.customerName.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.phone.includes(searchText) ||
      item.productName.toLowerCase().includes(searchText),
  )

  const columns = [
    { name: 'S. No.', selector: (_, index) => index + 1, sortable: true },
    { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Customer Name', selector: (row) => row.customerName, sortable: true },
    { name: 'Email', selector: (row) => row.email },
    { name: 'Phone', selector: (row) => row.phone },
    { name: 'Order Date', selector: (row) => row.orderDate, sortable: true },
    { name: 'Product Name', selector: (row) => row.productName },
    { name: 'Quantity', selector: (row) => row.quantity },
    { name: 'Status', selector: (row) => row.status },
    { name: 'Payment Status', selector: (row) => row.paymentStatus },
    { name: 'Amount', selector: (row) => row.amount },
    { name: 'Shipping Status', selector: (row) => row.shippingStatus },
    {
      name: 'Actions',
      cell: (row) => (
        <div className='d-flex'>
          <button className="text-red-500 btn btn-group">
            <FaEdit/>
          </button>
          <button className="text-red-500 btn btn-group" onClick={() => handleDelete(row.id)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="maincard mb-4">
        <div className="card">
          <div className="p-4">
            <div className="row">
              <div className="col-md-6">
                <h2 className="text-xl font-bold mb-3">Order List</h2>
              </div>
              <div className="col-md-6">
                <div className="orderbtn d-flex gap-2 justify-content-end">
                  <button className="btn btn-success text-white" onClick={() => setVisible(true)}>
                    <FaPlus className="me-1" /> Add
                  </button>
                  {/* <button className="btn btn-primary">
                    <FaEdit className="me-1" /> Edit
                  </button>
                  <button className="btn btn-danger text-white">
                    <FaTrash className="me-1" /> Delete
                  </button> */}
                  {/* <button className="btn btn-info text-white">
                    <FaEye className="me-1" /> View
                  </button> */}
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded mb-3 w-40"
              value={searchText}
              onChange={handleSearch}
            />
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover
              responsive
            />
          </div>
        </div>
        <CModal visible={visible} onClose={() => setVisible(false)} className="fade">
          <CModalHeader className="modal-header">
            <h5 className="modal-title">Add Order</h5>
            {/* <button type="button" className="btn-close" onClick={() => setVisible(false)}></button> */}
          </CModalHeader>
          <CModalBody className="modal-body">
            <CForm>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <CFormInput
                    label="Customer Name"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <CFormInput
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <CFormInput
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <CFormInput
                    type="date"
                    label="Order Date"
                    name="orderDate"
                    value={form.orderDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <CFormInput
                    label="Product Name"
                    name="productName"
                    value={form.productName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <CFormInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={form.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <CFormSelect
                    label="Order Status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Select status</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </CFormSelect>
                </div>
                <div className="col-md-6 mb-3">
                  <CFormSelect
                    label="Payment Status"
                    name="paymentStatus"
                    value={form.paymentStatus}
                    onChange={handleChange}
                  >
                    <option>Select status</option>
                    <option>Paid</option>
                    <option>Unpaid</option>
                  </CFormSelect>
                </div>
                <div className="col-md-6 mb-3">
                  <CFormSelect
                    label="Shipping Status"
                    name="shippingStatus"
                    value={form.shippingStatus}
                    onChange={handleChange}
                  >
                    <option>Select status</option>
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Completed</option>
                  </CFormSelect>
                </div>
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton className="btn btn-secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton className="btn btn-primary" onClick={handleSubmit}>
              Save
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </>
  )
}

export default Order
