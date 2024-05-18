import { Request, Response } from "express";
import {prisma} from "../../database";
import jwt from 'jsonwebtoken';

type typeName = {
    id: string
}

export class DeleteWatchList{


async handle (request: Request, response: Response){
    try{
        const {watchListId} = request.params;

        const verifywl = await prisma.watchList.findUnique({
            where:{
                id:watchListId
            }
        })

        if(!verifywl){
            return response.status(401).send({error: 'Não existe essa watchlist'})
        }

        const deleteMoviesOnWatchList = await prisma.savedMovies.deleteMany({
            where: {
                WatchlistId: verifywl.id
            }
        })

        const deleteLikes = await prisma.isLiked.deleteMany({
            where:{
                watchListId
            }
        })

        const deleteComments = await prisma.comment.deleteMany({
            where:{
                watchListId
            }
        })

        const deleteWatchList = await prisma.watchList.delete({
            where: {
                id:verifywl.id
            }
        })

        return response.status(200).json({deleteWatchList, deleteMoviesOnWatchList, deleteLikes, deleteComments})
    }
    catch{
        return response.status(500).send("Erro, tente novamente")
    }
}

}