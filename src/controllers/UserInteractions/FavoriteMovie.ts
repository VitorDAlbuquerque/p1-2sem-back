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
            const {authorization} = request.headers

            if(!authorization){
                return response.status(401).send({error: 'err!'})

            }

            const token = authorization.split(' ')[1]


            const {id} = jwt.verify(token, process.env.SECRET_TOKEN as string) as JwtPayload
            const user = await prisma.user.findUnique({where: {id}})
       
            if(!user){
                return response.status(401).send({error: 'err!'})
            }

            

            const isSaved = await prisma.isSaved.findUnique({
                where: {
                    saveId: {
                        userId: user.id,
                        movieId: movieId
                    }
                }
            })
        
                if(!isSaved){
                    
                    const newSave = await prisma.isSaved.create({
                        data: {
                            userId: user.id,
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
                            userId: user.id,
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