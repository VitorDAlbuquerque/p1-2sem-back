import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListMoviesOnWatchList {
    async handle(request: Request, response: Response){
        try{
            const {watchListId} = request.body

            const watchList = await prisma.watchList.findUnique({
                where:{
                    id: watchListId
                }
            })
    
            if(!watchList){
                return response.status(401).send({err: "Lista não encontrada!"})
            }
    
            const moviesOnWatchList = await prisma.savedMovies.findMany({
                where:{
                    WatchlistId: watchListId
                }
            })
    
            return response.status(200).json(moviesOnWatchList)
        } catch{
            return response.status(500).send("Error")
        }
    }
}