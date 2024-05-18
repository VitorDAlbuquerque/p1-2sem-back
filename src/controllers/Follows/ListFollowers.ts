import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListFollowers {
    async handle(request: Request, response: Response){
        try{
            const {userId} = request.params

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
                    userFollowedId: userId
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