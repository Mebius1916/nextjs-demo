'use client'
import { Button,Input} from "@material-tailwind/react";
import { useState } from "react";
import React from 'react'

const CreateUser = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!id||!name||!email||!password){
        alert('Please fill all the fields')
        return;
    }
    try{
        const responce = await fetch('/api/users',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id,
                name,
                age,
                email,
                password
            })
        })
        if(responce.ok){
            alert('User created successfully')
        }else{
            alert('Error creating user')
            return;
        }
    }catch(err){
        console.log(err)
    }
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
            <Button className="mt-2" type="submit">Create User</Button>
        </form>
    </div>
  )
}

export default CreateUser