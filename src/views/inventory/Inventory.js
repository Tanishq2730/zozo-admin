import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaTrash } from 'react-icons/fa'

const Inventory = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      image: 'https://picsum.photos/200/300',
      price: '₹500',
      category: 'Category A',
      quantity:"4"
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://picsum.photos/200/300',
      price: '₹800',
      category: 'Category B',
      quantity:"4"
    },
  ])

  const [searchText, setSearchText] = useState('')

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  )

  const columns = [
    {
      name: 'Product Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Product Image',
      cell: (row) => (
        <img src={row.image} alt={row.name} width="50" className="rounded border deliverImg" />
      ),
    },
    {
      name: 'Product Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Product Category',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button className="text-red-500 btn text-danger btn-group" onClick={() => handleDelete(row.id)}>
          <FaTrash />
        </button>
      ),
    },
  ]

  return (
    <div className="container mt-4">
      <div className="maincard">
        <div className="card shadow p-4">
          <h2 className="mb-3 text-left">Inventory Management</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by Product Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: '22%' }}
          />
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
