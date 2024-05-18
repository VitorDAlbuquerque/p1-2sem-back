import { Request, Response } from "express";
import { prisma } from "../../database";

export class UpdateUserTheme {
    async handle(request: Request, response: Response){
        try{
            const { theme } = request.body;

            const updateUser = await prisma.user.update({
                where:{
                    id: request.userId
                },
                data:{
                    theme
                }
            })
            return response.status(200).json(updateUser)

        }catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}