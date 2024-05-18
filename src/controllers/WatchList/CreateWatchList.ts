import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}

export class CreateWatchList {
    async handle(request: Request, response: Response){
        try{
            const {name, description, privacy, firstMovieId, movieName, movieURLImg, movieBanner} = request.body;

            const newWatchList = await prisma.watchList.create({
                data:{
                    name,
                    description,
                    privacy,
                    createDate: String(new Date()),
                    banner: movieBanner,
                    authorId: request.userId
                }
            })

            const newMovieAtList = await prisma.savedMovies.create({
                data:{
                    movieId: firstMovieId,
                    isChecked: false,
                    WatchlistId: newWatchList.id,
                    movieName,
                    movieURLImg
                }
            })

            return response.status(200).json({newWatchList, newMovieAtList})
        }

        catch{
            return response.status(500).send("Error")
        }
    }
    
}