import { Request, Response } from "express";
import { prisma } from "../../database";
import jwt from 'jsonwebtoken';

type typeName= {
    id: string
}
export class UpdateUserTheme {
    async handle(request: Request, response: Response){
        try{
            const { authorization } = request.headers;
            const { theme } = request.body;

            if (!authorization) {
                return response.status(500).send({ err: "Autorização inválida" });
            }
            const token = authorization.split(' ')[1];

            const {id} = jwt.verify(token, process.env.SECRET_TOKEN as string) as typeName;

            const user = await prisma.user.findUnique({where:{id}});

            if (!user){
                return response.status(500).send({ err: "Usuário não existe no banco" });
            }

            const updateUser = await prisma.user.update({
                where:{
                    id
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