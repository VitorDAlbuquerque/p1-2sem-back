import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListComments {
    async handle(request: Request, response: Response){
        try{
            const {watchlistId} = request.params

            const watchList = await prisma.watchList.findUnique({
                where: {
                    id: watchlistId
                }
            })

            if(!watchList){
                return response.status(401).send({err: "WatchList não encontrada!"})
            }

            const comments = await prisma.comment.findMany({
                where: {
                    watchListId: watchlistId
                },
                orderBy:{
                    createdAt: "desc"
                },
                include:{
                    user:{
                        select:{
                            name: true,
                            imgIndex: true
                        }
                    }
                }
            })

            return response.status(201).json(comments)
        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}