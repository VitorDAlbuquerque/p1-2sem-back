import { Request, Response } from "express";
import {prisma} from "../../database";
import jwt from 'jsonwebtoken';

type jwtPayload = {
    id: string
}

export class DeleteWatchList{
    async handle (request: Request, response: Response){
        try{
            const {watchListId} = request.params;
            const {authorization} = request.headers

            if(!authorization){
                return response.status(401).send({ error: 'Err!' });
            }
    
            const token = authorization.split(' ')[1]
    
            const { id } = jwt.verify(token, process.env.SECRET_TOKEN as string) as jwtPayload
    
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
    
            if(!user){
                return response.status(401).send({err: "Usuário não encontrado!"})
            }

            const verifywl = await prisma.watchList.findUnique({
                where:{
                    id: watchListId
                }
            })

            if(!verifywl){
                return response.status(401).send({error: 'Não existe essa watchlist'})
            }

            if(verifywl.authorId != user.id){
                return response.status(401).send({error: 'Não autorizado'})
            }

            const deleteWatchList = await prisma.watchList.delete({
                where:{
                    id: verifywl.id
                }
            })

            return response.status(200).json(deleteWatchList)
        }
        catch{
            return response.status(500).send("Erro, tente novamente")
        }
    }
}