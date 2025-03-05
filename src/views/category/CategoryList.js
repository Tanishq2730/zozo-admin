import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Modal, Button } from 'react-bootstrap'

const CategoryList = () => {
  const [searchText, setSearchText] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Fruits and Vegetables',
      slug: 'fruits-vegetables',
      parentCategory: 'Grocery & Staples',
      description: 'Lorem Ipsum',
      thumbnail: 'https://picsum.photos/50',
      imageForCategory: 'https://picsum.photos/50',
      extraDescription: 'Lorem ipsum dolor sit amet',
    },
  ])

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase())
  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText) ||
      item.slug.toLowerCase().includes(searchText) ||
      item.parentCategory.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText),
  )

  const columns = [
    { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Slug', selector: (row) => row.slug, sortable: true },
    { name: 'Parent Category', selector: (row) => row.parentCategory },
    { name: 'Description', selector: (row) => row.description },
    {
      name: 'Thumbnail',
      selector: (row) => row.thumbnail,
      cell: (row) => <img src={row.thumbnail} alt="Thumbnail" width={50} height={50} />,
    },
    {
      name: 'Image for Category Page Title',
      selector: (row) => row.imageForCategory,
      cell: (row) => <img src={row.imageForCategory} alt="Category" width={50} height={50} />,
    },
    { name: 'Extra Description', selector: (row) => row.extraDescription },
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
      <div className="maincard mb-4 mt-4">
        <div className="card">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-3">Category List</h2>
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
      </div>
    </>
  )
}

export default CategoryList
