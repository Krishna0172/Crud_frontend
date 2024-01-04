    import axios from 'axios';
    import React, { useState } from 'react';
    import { Button, Form } from 'semantic-ui-react';
    import { useNavigate } from 'react-router-dom';
    const Create = () => {
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [dep, setDep] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('http://localhost:3300/users/', {
            id,
            name,
            age,
            dep,
        });

        console.log('Data submitted successfully:', response.data);
        console.log(id,name,age,dep)
        setID('');
        setName('');
        setAge('');
        setDep('');
        navigate('/read');

        } catch (error) {
        console.error('Error submitting data: ', error);
        }
    };

    return (
        <div>
        <h2> React Create - Form</h2>
        <Form onSubmit={handleSubmit} className="create-form">
            <Form.Field>
            <label>ID</label>
            <input placeholder="ID" value={id} onChange={(e) => setID(e.target.value)} />
            </Form.Field>
            <Form.Field>
            <label>Name</label>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
            <label>Age</label>
            <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            </Form.Field>
            <Form.Field>
            <label>Dep</label>
            <input
                placeholder="Department"
                value={dep}
                onChange={(e) => setDep(e.target.value)}
            />
            </Form.Field>
            <Button type="submit">submit</Button>
        </Form>
        </div>
    );
    };

    export default Create;
