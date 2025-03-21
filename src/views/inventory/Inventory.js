import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaTrash } from 'react-icons/fa'

const Inventory = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      image: 'https://picsum.photos/200/300',
      price: 500,
      discountPrice: 450,
      category: 'Category A',
      quantity: 4,
      sku: 'SKU1234',
      status: 'Active',
      supplier: 'Supplier A',
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://picsum.photos/200/300',
      price: 800,
      discountPrice: 700,
      category: 'Category B',
      quantity: 4,
      sku: 'SKU1235',
      status: 'Inactive',
      supplier: 'Supplier B',
    },
  ])

  const [searchText, setSearchText] = useState('')

  // ✅ Handle Delete
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  // ✅ Filter Data based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(searchText.toLowerCase()) ||
      product.status.toLowerCase().includes(searchText.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchText.toLowerCase())
  )

  // ✅ Data Table Columns
  const columns = [
    {
      name: 'Product Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'SKU',
      selector: (row) => row.sku,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Supplier',
      selector: (row) => row.supplier,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => `₹${row.price}`,
      sortable: true,
    },
    {
      name: 'Discount Price',
      selector: (row) => `₹${row.discountPrice}`,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Product Image',
      cell: (row) => (
        <img src={row.image} alt={row.name} width="50" className="rounded border deliverImg" />
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(row.id)}
        >
          <FaTrash />
        </button>
      ),
    },
  ]

  return (
    <div className="container mt-4">
      <div className="maincard">
        <div className="card shadow p-4">
          <h2 className="mb-3">Inventory Management</h2>
          {/* ✅ Search Bar */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by Product Name, SKU, Category, etc."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: '30%' }}
          />
          {/* ✅ Data Table */}
          <DataTable
            columns={columns}
            data={filteredProducts}
            pagination
            highlightOnHover
            striped
            responsive
          />
        </div>
      </div>
    </div>
  )
}

export default Inventory
