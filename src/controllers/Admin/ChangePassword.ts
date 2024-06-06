import { Request, Response } from "express";
import {prisma} from "../../database";
import bcryptjs from 'bcryptjs'


export class ChangePassword {
    async handle(request: Request, response: Response){
        try{

            const {changeId, newPassword} = request.body;
            console.log(changeId, newPassword)

            const verifyAdmin = await prisma.user.findUnique({
                where: {
                    id: request.userId,
                    isADM: true
                }
            })

            if(!verifyAdmin){
                return response.status(401).send("Usuario não é admin")
            }

            const verifyid = await prisma.user.findUnique({
                where:{
                    id: changeId
                }
            })

            if(!verifyid){
                return response.status(401).send("Não existe esse usuário!")
            }

            const password_hash = bcryptjs.hashSync(newPassword, 8);

            await prisma.user.update({
                where:{
                    id: changeId
                },
                data:{
                    password: password_hash
                }
            })

            return response.status(200).send({ message: "Senha atualizada!"})

        }catch{
        return response.status(500).send("Erro, tente novamente")
    }
    }
}