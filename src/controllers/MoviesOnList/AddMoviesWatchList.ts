import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}
export class AddMoviesWatchList {
    async handle(request: Request, response: Response) {
        try {
            const { movieName, watchListId, movieId,  movieURLImg} = request.body;
            const verifywl = await prisma.watchList.findUnique({
                where: {
                    id: watchListId
                }
            })

            if (!verifywl) {
                return response.status(401).send("Não existe")
            }

            const newMovieAtList = await prisma.savedMovies.create({
                data:{
                    movieId,
                    isChecked: false,
                    WatchlistId: watchListId,
                    movieName,
                    movieURLImg
                }
            })


            return response.status(200).json(newMovieAtList)
        }
        catch {
            return response.status(500).send("Erro, tente novamente")
        }
    }
}