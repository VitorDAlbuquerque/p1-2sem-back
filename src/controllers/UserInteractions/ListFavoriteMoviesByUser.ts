import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { prisma } from "../../database";

export class ListFavoriteMovieByUser{

    async handle(request: Request, response: Response){
        try{

            const {userId} = request.params
            if(!userId){
                return response.status(400).send('Sem autorização!')
            }

            const user = await prisma.user.findUnique({where: {id: userId}})

            if(!user){
                return response.status(400).send("Não existe esse usuário!")
            }

            const listFavoriteMovieByUser = await prisma.isSaved.findMany({
                where: {
                    userId
                },
               

            })
            return response.status(200).json(listFavoriteMovieByUser)
        }
        catch{

            return response.status(400).send("Falha! por favor tente novamente!")

        }

    }

}