import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    id: '',
    name: '',
    age: '',
    dep: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const updatedUser = { ...user, id: parseInt(id) };
      await axios.put(`http://localhost:3300/users/${id}`, updatedUser);
      console.log('User updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error.response || error.message || error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className='update-container'>React Crud - Update</h2>
      <form className='update-form' >
        <div className="form-field">
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={user.id}
            readOnly
            placeholder={user.id}
          />
        </div>
  
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>
  
        <div className="form-field">
          <label>Age</label>
          <input
            type="text"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="Enter age"
          />
        </div>
  
        <div className="form-field">
          <label>Department</label>
          <input
            type="text"
            name="dep"
            value={user.dep}
            onChange={handleChange}
            placeholder="Enter department"
          />
        </div>
  
        <button className='update-button' type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );

};

export default Update;
