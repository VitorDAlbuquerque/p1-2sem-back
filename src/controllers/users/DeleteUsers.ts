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
            await prisma.user.delete({where:{id}})
            return response.status(200).send({ message: "Conta de usuário deletada" });
            
        } catch(error) {
            console.error(error);
            return response.status(500).send({ err: "Falha! Por favor tente novamente mais tarde." });
        }
    }
}
