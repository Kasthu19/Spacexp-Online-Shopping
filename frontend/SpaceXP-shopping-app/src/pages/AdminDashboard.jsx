import React, { useState, useEffect } from 'react';
import { API } from '../api';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'customer' 
  });
  const [loading, setLoading] = useState(false);
  
  // ========== DEBUG CODE ==========
  console.log('=== DEBUG INFO ===');
  console.log('Token from localStorage:', localStorage.getItem('token'));
  console.log('Current user:', localStorage.getItem('user'));
  console.log('API URL:', API);
  console.log('Token exists?', !!localStorage.getItem('token'));
  // ========== END DEBUG ==========
  
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
  setLoading(true);
  try {
    console.log('Fetching users...'); // Add this
    
    const response = await fetch(`${API}/api/admin`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status); // Add this
    
    if (response.status === 401) {
      alert('Unauthorized! Please login as admin.');
      return;
    }
    
    const data = await response.json();
    console.log('API response data:', data); // Add this to see what's returned
    
    // Check if data is an array
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error('Expected array but got:', data);
      setUsers([]); // Set empty array as fallback
      alert('Server returned unexpected data format');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
    alert('Failed to fetch users: ' + error.message);
    setUsers([]); // Set empty array on error
  } finally {
    setLoading(false);
  }
};

  const createUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Please fill all fields');
      return;
    }

    console.log('Creating user with data:', newUser); // Add this
    console.log('Using token:', token); // Add this

    try {
      const response = await fetch(`${API}/api/admin/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      });

      console.log('Create user response status:', response.status); // Add this
      const result = await response.json();
      console.log('Create user result:', result); // Add this
      
      if (response.ok) {
        alert('User created successfully!');
        setNewUser({ name: '', email: '', password: '', role: 'customer' });
        fetchUsers();
      } else {
        alert(result.msg || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`${API}/api/admin/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('User deleted successfully!');
        fetchUsers();
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-main-title">Admin Dashboard - User Management</h1>
      
      {/* Create User Form */}
      <div className="admin-form">
        <h2 className="admin-sub-title">Create New User</h2>
        
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            className="admin-input"
            placeholder="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          />
        </div>
        
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            className="admin-input"
            placeholder="email@example.com"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          />
        </div>
        
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            className="admin-input"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
          />
        </div>
        
        <div className="form-control">
          <label>Role</label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            className="admin-input"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="marketing">Marketing</option>
            <option value="content">Content</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        
        <button onClick={createUser} className="admin-btn-primary">
          Create User
        </button>
      </div>

      {/* Users List */}
      <div className="admin-users-section">
        <div className="admin-section-header">
          <h2 className="admin-sub-title">Users List</h2>
          <button
            onClick={fetchUsers}
            className="admin-btn-secondary"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="admin-no-data">No users found</div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr className="admin-table-header">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="admin-table-row">
                    <td>{user.name || 'N/A'}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`admin-role-badge ${
                        user.role === 'admin' ? 'admin-role-admin' :
                        user.role === 'customer' ? 'admin-role-customer' :
                        'admin-role-staff'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="admin-delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}