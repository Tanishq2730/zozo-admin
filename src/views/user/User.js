import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Trash2 } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    type: "Admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { ...formData, id: Date.now() }]);
    setFormData({ username: "", email: "", phone: "", password: "", type: "Admin" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const columns = [
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Type", selector: (row) => row.type },
    {
      name: "Actions",
      cell: (row) => (
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
          <Trash2 size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-5 maincard">
      <div className="card shadow">
        <h3>Add User</h3>
        <div className="card-bodys">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <input className="form-control" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="Seller">Seller</option>
              </select>
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn text-white btn-info w-100">Add User</button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-4">
        <DataTable className="table table-striped" columns={columns} data={users} pagination />
      </div>
    </div>
  );
}
