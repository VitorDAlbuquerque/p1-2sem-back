import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}

export class ListWatchListByUserToken {
    async handle(request: Request, response: Response){
        try{

            const watchLists = await prisma.watchList.findMany({
                where: {
                    authorId: request.userId
                },
                include: {
                    user: {
                        select:{
                            name: true,
                            imgIndex: true
                        }
                    },
                    isLiked:{
                        select:{
                            userId: true,
                            watchListId: true
                        }
                    },
                    comment:{
                        select:{
                            userId: true
                        }
                    }
                }
            })
    
            return response.status(200).json(watchLists)
        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }  
    }
}