import { Request, Response } from "express";
import { prisma } from "../../database";

export class GetUserById {
    async handle(request: Request, response: Response){
        try{
            const {id} = request.params

            const user = await prisma.user.findUnique({
                where:{
                    id
                },
                include:{
                    isFollowed: {
                        select:{
                            userFollowingId: true
                        }
                    }
                }
            })

            return response.status(200).json(user)

        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}