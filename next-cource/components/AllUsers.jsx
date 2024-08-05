'use client'
import { useState,useEffect } from 'react'
import {List,ListItem,Card} from '@material-tailwind/react'
import React from 'react'

const AllUsers = () => {
    const [users,setUsers] = useState('')
    useEffect(()=>{
        const fetchAllUsers = async () => {
            const response  =await fetch("/api/users");
            const userInfo = await response.json();
            setUsers(userInfo.data)
        };
        fetchAllUsers();
    },[])
  return (
    <div>
        {users && users.map((user)=>(
            <Card key={user.id} className="mb-1">
                <List>
                    <ListItem>
                        {user.name}
                    </ListItem>
                    
                </List>
            </Card>
        ))}

    </div>
  )
}

export default AllUsers