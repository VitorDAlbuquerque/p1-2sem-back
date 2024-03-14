import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';


export class CreateWatchList {

    async handle(request: Request, response: Response){

        try{

            const {id:user} = request.header;
            const {name, description, privacy, createDate} = request.body;

            
            const ida = await prisma.user.findFirst({
                where:{
                    id:user,

                }
            })


            const newWatchList = await prisma.watchList.create({
                data:{
                    name,
                    description,
                    privacy,
                    createDate,
                    authorId
                    
                }
            })

            return response.status(200).json(newWatchList)

        }

        catch{

        }
    }
    
}