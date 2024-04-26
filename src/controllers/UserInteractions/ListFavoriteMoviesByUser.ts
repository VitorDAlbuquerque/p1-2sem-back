import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { prisma } from "../../database";

type jwtstring = {
    id: string
}

export class ListFavoriteMovieByUser{

    async handle(request: Request, response: Response){
        try{

            const {authorization} = request.headers

            if(!authorization)
            {
                return response.status(400).send('Sem autorização!')
            }

            const token = authorization.split(' ')[1]

            const {id} = jwt.verify(token, process.env.SECRET_TOKEN as string) as jwtstring

            const user = await prisma.user.findUnique({where: {id}})

            if(!user){
                return response.status(400).send("Não existe esse usuário!")
            }

            const listFavoriteMovieByUser = await prisma.isSaved.findMany({
                where: {
                    userId: id

                }
            })
            return response.status(200).json(listFavoriteMovieByUser)
        }
        catch{

            return response.status(400).send("Falha! por favor tente novamente!")

        }

    }

}