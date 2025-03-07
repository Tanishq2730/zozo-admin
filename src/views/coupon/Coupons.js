import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { FaTrash } from 'react-icons/fa'

const Coupon = () => {
  const { register, handleSubmit, reset } = useForm()
  const [coupons, setCoupons] = useState([])
  const [filterCategory, setFilterCategory] = useState('')

  const onSubmit = (data) => {
    setCoupons([...coupons, { id: coupons.length + 1, ...data }])
    reset() // Reset form after submission
  }

  const handleDelete = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id))
  }

  const filteredCoupons = filterCategory
    ? coupons.filter((coupon) => coupon.category === filterCategory)
    : coupons

  const columns = [
    { name: 'Coupon Code', selector: (row) => row.couponCode, sortable: true },
    { name: 'Discount (%)', selector: (row) => row.discount, sortable: true },
    { name: 'Expiration Date', selector: (row) => row.expiryDate, sortable: true },
    { name: 'Category', selector: (row) => row.category, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <button className="btn btn-danger btn-sm text-white" onClick={() => handleDelete(row.id)}>
          <FaTrash />
        </button>
      ),
    },
  ]

  return (
    <div className="my-4">
      <div className="maincard">
        <div className="card p-4 mb-4">
          <h3 className="mb-4">Add New Coupon</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Coupon Code</label>
                  <input
                    {...register('couponCode', { required: true })}
                    className="form-control"
                    placeholder="Enter coupon code"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Discount (%)</label>
                  <input
                    type="number"
                    {...register('discount', { required: true })}
                    className="form-control"
                    placeholder="Enter discount percentage"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Set Usage Limit (Days)</label>
                  <input
                    type="number"
                    {...register('discount', { required: true })}
                    className="form-control"
                    placeholder="Enter discount percentage"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    {...register('expiryDate', { required: true })}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Expiration Date</label>
                  <input
                    type="date"
                    {...register('expiryDate', { required: true })}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select {...register('category', { required: true })} className="form-control">
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Grocery">Grocery</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Sub Category</label>
                  <select {...register('category', { required: true })} className="form-control">
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Grocery">Grocery</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3 mt-auto mb-3">
                <button type="submit" className="btn btn-info text-white w-100">
                  Add Coupon
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="maincard">
        <div className="card p-4">
          <h2 className="mb-4">Coupons List</h2>
          <div className="row">
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">Filter by Category</label>
                <select
                  className="form-control"
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Grocery">Grocery</option>
                </select>
              </div>
            </div>
          </div>
          <DataTable columns={columns} data={filteredCoupons} pagination />
        </div>
      </div>
    </div>
  )
}

export default Coupon
