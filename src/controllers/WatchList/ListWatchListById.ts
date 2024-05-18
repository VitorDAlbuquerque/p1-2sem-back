import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListWatchListById {
    async handle(request: Request, response: Response){
        try{
            const {id} = request.params
    
            const watchList = await prisma.watchList.findUnique({
                where: {
                    id: id
                },
                include: {
                    user: {
                        select:{
                            name: true,
                            id: true,
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
    
            return response.status(200).json(watchList)
        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }  
    }
}