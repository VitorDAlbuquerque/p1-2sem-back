import { Request, Response } from "express";
import {prisma} from "../../database";
import jwt, { Jwt } from 'jsonwebtoken';


type JwtPayload = { 
    id: String
}


export class UpdateWatchList{

async handle( request: Request, response: Response){

    try{

        const { authorization} = request.headers;
        const {name, description, privacy, createDate} = request.body;

        if(!authorization){
            return response.status(401).send({error: 'err!'})
        }

        const token = authorization.split(' ')[1]

        const{id} = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload


        const updateWatchList = await prisma.watchList.update({
            where: {
                
            }
        })

    }
}



}