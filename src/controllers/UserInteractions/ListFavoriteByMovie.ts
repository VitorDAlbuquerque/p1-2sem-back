import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { prisma } from "../../database";

export class ListFavoriteMovieByMovie{
    async handle(request: Request, response: Response){
        try{
            const {movieId} = request.params

            if(!movieId){
                return response.status(400).send('Sem filme!')
            }

            const listFavoriteMovieByMovie = await prisma.isSaved.findMany({
                where: {
                    movieId
                },
                include:{
                    user:{
                        select:{
                            id: true
                        }
                    }
                }
            })
            return response.status(200).json(listFavoriteMovieByMovie)
        }
        catch{

            return response.status(400).send("Falha! por favor tente novamente!")

        }

    }

}