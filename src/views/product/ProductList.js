import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Modal, Button } from 'react-bootstrap'

const ProductList = () => {
  const [searchText, setSearchText] = useState('')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [data, setData] = useState([
    {
      id: 1,
      productName: 'Product A',
      shortName: 'ProdA',
      description: 'This is Product A',
      url: 'https://example.com/product-a',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      productName: 'Product B',
      shortName: 'ProdB',
      description: 'This is Product B',
      url: 'https://example.com/product-b',
      image: 'https://picsum.photos/200/300',
    },
  ])
  const [editItem, setEditItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase())
  }

  const handleEdit = (item) => {
    setEditItem({ ...item })
    setIsEditing(true)
  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const updateItem = (updatedItem) => {
    setData(data.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const filteredData = data.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchText) ||
      item.shortName.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText),
  )

  const columns = [
    {
      name: 'Product Name',
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: 'Short Name',
      selector: (row) => row.shortName,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'URL',
      selector: (row) => row.url,
      cell: (row) => (
        <a href={row.url} target="_blank" rel="noopener noreferrer">
          Visit
        </a>
      ),
    },
    {
      name: 'Images',
      selector: (row) => row.image,
      cell: (row) => <img src={row.image} alt={row.productName} width={50} height={50} />,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button
            className="mr-2 btn btn-group text-blue-500"
            //   onClick={handleShow}
          >
            <FaEdit />
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
      <div className="p-4">
        <h2 className="text-xl font-bold mb-3">Product List</h2>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded mb-3"
          value={searchText}
          onChange={handleSearch}
        />
        <DataTable columns={columns} data={filteredData} pagination highlightOnHover responsive />
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This is a simple modal pop-up using Bootstrap Modal component.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default ProductList
