import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type typeName= {
    id: string
}

export class DeleteUsers {
    async handle(request: Request, response: Response){
        try {
            const { authorization } = request.headers;
            
            if (!authorization) {
                return response.status(500).send({ err: "Autorização inválida" });
            }
            const token = authorization.split(' ')[1];

            const {id} = jwt.verify(token, process.env.SECRET_TOKEN as string) as typeName;

            const user = await prisma.user.findUnique({where:{id}});

            if (!user){
                return response.status(500).send({ err: "Usuário não existe no banco" });
            }

            await prisma.isLiked.deleteMany({
                where: {
                    userId: id
                }
            })

            await prisma.isLiked.deleteMany({
                where: {
                    watchlist:{
                        authorId: id
                    }
                }
            })


            await prisma.comment.deleteMany({
                where: {
                    userId: id
                }
            })

            await prisma.comment.deleteMany({
                where: {
                    watchlist:{
                        authorId: id
                    }
                }
            })

            await prisma.isFollow.deleteMany({
                where: {
                    userFollowingId: id
                }
            })

            await prisma.savedMovies.deleteMany({
                where:{
                   Watchlist: {
                    authorId: id
                   } 
                }
            })

            await prisma.watchList.deleteMany({
                where:{
                    authorId: id
                }
            })

            await prisma.review.deleteMany({
                where:{
                    userId: id
                }
            })

            await prisma.isSaved.deleteMany({
                where:{
                    userId: id
                }
            })

            await prisma.user.delete({where:{id}})
            return response.status(200).send({ message: "Conta de usuário deletada" });
            
        } catch(error) {
            return response.status(500).send({ err: "Falha! Por favor tente novamente mais tarde." });
        }
    }
}
