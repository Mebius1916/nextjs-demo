import {users} from '../../util/db.js'
import { NextResponse } from 'next/server';
import fs from 'fs'
export function GET(){
    const data=users;
    return NextResponse.json({data},{status:200});
}

export async function POST(req,res){
    //获取请求体中的数据,所以用req.json()
    let {id,name,email,password} = await req.json();
    if(!id ||!name || !email || !password){
        return NextResponse.json(
        {message: "Please fill all the fields"},
        {status:400})
    }else{
        users.push({id,name,email,password});
        const updatedUsersArray=users;
        const updatedData = JSON.stringify(updatedUsersArray,null,2);
        fs.writeFileSync(
        './app/util/db.js',
        `export const users = ${updatedData};`,
        "utf-8");
        return NextResponse.json({message: "User created successfully"},{status:200},{ok:true});
    }
}

export async function PUT(req,res){
    let {id,name,email,password} = await req.json();
    const userIndex = users.findIndex((u) => u.id===id);
    if(userIndex === -1){
        return NextResponse.json({message: "User not found"},{status:404})
    }
    if(name){
        users[userIndex].name=name;
    }
    if(email){
        users[userIndex].email=email;
    }
    if(password){
        users[userIndex].password=password;
    }
    const updatedUsersArray=users;
    const updatedData = JSON.stringify(updatedUsersArray,null,2);
    fs.writeFileSync(
    './app/util/db.js',
    `export const users = ${updatedData};`,
    "utf-8");
    return NextResponse.json({message: "User updated successfully"},{status:200},{ok:true});
}

export async function DELETE(req,res){
    //获取请求体中的数据,所以用req.json()
    let {id} = await req.json();
    const userIndex = users.findIndex((u) => u.id===id);
    if(userIndex === -1){
        return NextResponse.json({message: "User not found"},{status:404})
    }
    if(userIndex){
        //删除数组中的元素
        //splice(其实索引，删除元素的个数)
        users.splice(userIndex,1);
    }
    const updatedUsersArray=users;
    const updatedData = JSON.stringify(updatedUsersArray,null,2);
    fs.writeFileSync(
    './app/util/db.js',
    `export const users = ${updatedData};`,
    "utf8");
    return NextResponse.json({message: "User deleted successfully"},{status:200},{ok:true});
}