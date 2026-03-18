import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const App = () => {
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.id) {
      await updateUser(user);
    }
    else {
      await createUser(user);
    }
    getAllUser();
    setUser({});
  }

  const createUser = async (user) => {
    try {
      await axios.post('http://localhost:3000/user', user);
      getAllUser();
      toast.success('User Created.');
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getAllUser = async () => {
    try {
      let res = await axios.get('http://localhost:3000/user');
      setList(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      getAllUser();
      toast.success('User Deleted.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (id) => {
    let data = list.find(item => item.id === id);
    setUser(data);
  };

  const updateUser = async (user) => {
    try {
      let id = user.id;
      delete user.id;
      let res = await axios.patch(`http://localhost:3000/user/${id}`, user);
      toast.success(`${res.data.username} Updated Successfully.`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <form action="" method="post" className='card p-4' onSubmit={handleSubmit}>
              <h2 className='text-center mb-4'>Sign Up</h2>
              <div className="mb-2">
                <label htmlFor="username" className='form-label'>User Name</label>
                <input type="text" id='username' name='username' value={user.username || ''} onChange={handleChange} className='form-control' />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className='form-label'>Email ID</label>
                <input type="email" id='email' name='email' value={user.email || ''} onChange={handleChange} className='form-control' />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" id='password' name='password' value={user.password || ''} onChange={handleChange} className='form-control' />
              </div>
              <button type='submit' className='btn btn-dark'>Sign Up</button>
            </form>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <table className='table table-bordered table-striped table-hover caption-top'>
              <caption><h2 className='text-center mb-4'>User Data</h2></caption>
              <thead className='table-dark'>
                <tr className='text-center'>
                  <th>#.</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  list.map((value, index) => {
                    return (
                      <tr key={value.id} className='text-center align-middle'>
                        <td>{index + 1}</td>
                        <td>{value.username}</td>
                        <td>{value.email}</td>
                        <td>{value.password}</td>
                        <td>
                          <button type='button' className='btn btn-danger me-2' onClick={() => handleDelete(value.id)}>Delete</button>
                          <button type='button' className='btn btn-warning' onClick={() => handleEdit(value.id)}>Edit</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
};

export default App;