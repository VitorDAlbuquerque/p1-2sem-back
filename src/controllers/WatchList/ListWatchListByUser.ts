import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListWatchListByUser {
    async handle(request: Request, response: Response){
        try{
            const {id} = request.params

            const watchLists = await prisma.watchList.findMany({
                where: {
                    authorId: id
                },
                include: {
                    user: {
                        select:{
                            name: true
                        }
                    },
                    isLiked:{
                        select:{
                            userId: true,
                            watchListId: true
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