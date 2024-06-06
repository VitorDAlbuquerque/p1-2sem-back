import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListFollowersByName {
    async handle(request: Request, response: Response){
        try{
            const {name, userId} = request.body

            const user = await prisma.user.findUnique({
                where:{
                    id: userId
                }
            })

            if(!user){
                return response.status(500).send({ err: "Usuário não existe no banco" });
            }

            const followes = await prisma.isFollow.findMany({
                where:{
                    userFollowedId: userId,
                    userFollowing:{
                        name:{
                            contains: name,
                            mode: 'insensitive'
                        }
                    }
                },
                include:{
                    userFollowing:{
                        select:{
                            name: true,
                            imgIndex: true
                        }
                    }
                }
            })
            
            return response.status(200).json(followes)
            
        } catch{
            return response.status(500).send("Erro, tente novamente")
        }
    }
}