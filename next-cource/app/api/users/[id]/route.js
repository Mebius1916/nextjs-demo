import { NextResponse } from 'next/server'
import {users} from '../../../util/db.js'
import fs from 'fs'
export async function GET(_,res) {
  const {id} =await res.params;
  const user = users.filter((user) => user.id === id);
  return NextResponse.json({user,ok:true});
}
//req为客户端发送请求时的请求体，res为服务器返回给客户端的响应体
//req.json()为客户端发送请求时，从请求体中获取的json数据，res.json()为服务器返回给客户端的json数据
export async function POST(req,res){
    let {name,email,password} = await req.json();
    const {id} = await res.params;
    const {
        name: uName,
        email:uEmail,
        password:uPassword,
    } = users.find((user) => user.id === id);
    
    if(uName === name && uEmail === email && uPassword === password){
        return NextResponse.json({message: "Login Successful"},{status:200},{ok:true});

    }else{
        return NextResponse.json({message: "Login Failed"},{status:400});
    }
}

export async function DELETE(req,res){
    //从路由中获取id，所以用res.params
    console.log(res.params);
    const {id} = await res.params;
    const userIndex = users.findIndex((user) => user.id===id);
    if(userIndex === -1){
        return NextResponse.json({message: "User not found"},{status:404})
    }
    users.splice(userIndex,1);
    
    const updatedUsersArray=users;
    const updatedData = JSON.stringify(updatedUsersArray,null,2);
    fs.writeFileSync(
    './app/util/db.js',
    `export const users = ${updatedData};`,
    "utf-8");
    return NextResponse.json({message: "User deleted successfully"},{status:200},{ok:true});
}
