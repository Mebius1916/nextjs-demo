'use client'
import { useState } from 'react'
import { Button,Input } from '@material-tailwind/react'
import React from 'react'

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!id){
        alert("Please provide id")
        return;
    }
    const requestData = { id };
    if(name){
        requestData.name = name;
    }
    if(age){
        requestData.age = age;
    }
    if(email){
        requestData.email = email;
    }
    if(password){
        requestData.password = password;
    }
    try{
        const responce =await fetch("/api/users",{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(
                requestData
            )
        })
        if(responce.ok){
            alert('User created successfully');
            clearForm();
        }else{
            alert('Error creating user');
            const data=await responce.json();
            alert(data.result || 'Something went wrong');
            return;
        }
   }catch(err){
        console.log(err);
   }
}
  const clearForm = () =>{
     setId('');
     setName('');
     setAge('');
     setEmail('');
     setPassword('');
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Input 
            label="ID"
            placeholder="ID"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            />
              <Input 
            label="Name"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <Input 
            label="age"
            placeholder="age"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            />
          
            <Input 
            label="Email"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
            label="Password"
            placeholder="Password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="mt-2" type="submit">Update User</Button>
        </form>
    </div>
  )
}

export default UpdateUser