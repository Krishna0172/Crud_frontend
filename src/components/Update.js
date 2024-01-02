import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Update = ({ match }) => {
  const userId = match.params.id;

  const [user, setUser] = useState({
    id: '',
    name: '',
    age: '',
    dep: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3300/users/${userId}`, user);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
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
      <h2>Update</h2>
      <form>
        <label>ID</label>
        <input type="text" name="id" value={user.id} readOnly />

        <label>Name</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} />

        <label>Age</label>
        <input type="text" name="age" value={user.age} onChange={handleChange} />

        <label>Department</label>
        <input type="text" name="dep" value={user.dep} onChange={handleChange} />

        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
