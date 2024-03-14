import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}

export class CreateWatchList {

    async handle(request: Request, response: Response){
        
        try{

            const {authorization} = request.headers;
            const {name, description, privacy, createDate} = request.body;

            if(!authorization){
                return response.status(401).send({error: 'err!'})

            }
            const token = authorization.split(' ')[1]
            

            const {id}  = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload
            

            const newWatchList = await prisma.watchList.create({
                data:{
                    name,
                    description,
                    privacy,
                    createDate,
                    authorId: id
                }
            })

            


            


            return response.status(200).json(newWatchList)

        }

        catch{
                return response.status(500).send("Error")
        }
    }
    
}