import {prisma} from'@/lib/prisma'
import { NextRequest,NextResponse } from 'next/server'


export async function POST(req:NextRequest){

const body =  await req.json();
const {name, email,password} =body;

const newUser = await prisma.user.create({
    data:{name,email,password},
});

return NextResponse.json(newUser, {status:201})

}

export async function GET(response:NextResponse){

    const users = await prisma.user.findMany();
    return NextResponse.json(users);

}