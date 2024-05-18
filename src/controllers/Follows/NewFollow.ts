import { Request, Response } from "express";
import { prisma } from "../../database";

export class NewFollow {
    async handle(request: Request, response: Response){
        try{
            const {followedId} = request.body

            const userFollowed = await prisma.user.findUnique({
                where:{
                    id: followedId
                }
            })

            if(!userFollowed){
                return response.status(500).send({ err: "Usuário não existe no banco" });
            }

            const followExist = await prisma.isFollow.findUnique({
                where:{
                    isFollowingId:{
                        userFollowingId: request.userId,
                        userFollowedId: followedId
                    }
                }
            })

            if(followExist){
                const deleteFollow = await prisma.isFollow.delete({
                    where:{
                        isFollowingId:{
                            userFollowingId: request.userId,
                            userFollowedId: followedId
                        }
                    }
                })
                return response.status(200).json(deleteFollow)

            }else {
                const newFollow = await prisma.isFollow.create({
                    data:{
                        userFollowedId: followedId,
                        userFollowingId: request.userId
                    }
                })
                return response.status(200).json(newFollow)
            }
            
        } catch{
            return response.status(500).send("Erro, tente novamente")
        }
    }
}