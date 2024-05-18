import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id:string
}



export class FavoriteMovie{

    async handle (request: Request, response: Response ) {

        
        try{
             
            const {movieId, movieName, movieIMG} = request.body

            const isSaved = await prisma.isSaved.findUnique({
                where: {
                    saveId: {
                        userId: request.userId,
                        movieId: movieId
                    }
                }
            })
        
                if(!isSaved){
                    
                    const newSave = await prisma.isSaved.create({
                        data: {
                            userId: request.userId,
                            movieId: movieId,
                            movieName: movieName,
                            movieIMG: movieIMG
                        }
                    })
                    return response.status(200).json(newSave)
                }
            else{
                const deleteSave = await prisma.isSaved.delete({
                    where: {
                        saveId: {
                            userId: request.userId,
                            movieId: movieId
                        }
                    }
                })
                return response.status(200).json(deleteSave)
            }
            } catch{
                return response.status(500).send({err: "Falha! Por favor tetne novamente."})
            }

        


    }


}