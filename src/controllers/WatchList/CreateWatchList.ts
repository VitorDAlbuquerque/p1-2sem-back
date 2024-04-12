import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}

export class CreateWatchList {
    async handle(request: Request, response: Response){
        try{
            const {authorization} = request.headers;
            const {name, description, privacy, firstMovieId, movieName, movieURLImg, movieBanner} = request.body;

            if(!authorization){
                return response.status(401).send({error: 'err!'})
            }

            const token = authorization.split(' ')[1]

            const {id}  = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload

            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            if(!user){
                return response.status(401).send({err: "Usuário não encontrado!"})
            }
            
            const newWatchList = await prisma.watchList.create({
                data:{
                    name,
                    description,
                    privacy,
                    createDate: String(new Date()),
                    banner: movieBanner,
                    authorId: user.id
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