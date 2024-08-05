import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import React from "react";


const DeleteUser = () => {
  const [id, setId] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!id){
        alert("Please provide id")
        return;
    }
    try{
        const responce = await fetch(`/api/users`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                id
            })
        })
        if(responce.ok){
            alert('User deleted successfully');
            clearForm();
        }else{
            alert('ID not found');
            return;
        }

    }catch(err){
        console.log(err);
    }
  }
  const clearForm = () =>{
    setId('');
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
            <Button className="mt-2" type="submit">Delete User</Button>
        </form>
    </div>
  )
}

export default DeleteUser