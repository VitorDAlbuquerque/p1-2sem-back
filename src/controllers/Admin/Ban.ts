import { Request, Response } from "express";
import { prisma } from "../../database";



export class Ban{
    async handle(request: Request, response: Response){
        try{
            const{banId} = request.body;
            const{userid} = request.params;


            const verifyAdmin = await prisma.user.findUnique({
                where: {
                    id: userid,
                    isADM: true
                }
            })

            if(!verifyAdmin){
                return response.status(401).send("Usuario não é ADMIN")
            }
            const verifyid = await prisma.user.findUnique({
                where: {
                    id: banId
                }
            })

            if(!verifyid){
                return response.status(401).send("Não existe esse usuário.")
            }



            await prisma.isLiked.deleteMany({
                where: {
                    userId: banId
                }
            })

            await prisma.savedMovies.deleteMany({
                where:{
                   Watchlist: {
                    authorId: banId
                   } 
                }
            })
            await prisma.watchList.deleteMany({
                where:{
                    authorId: banId
                }
            })

            await prisma.review.deleteMany({
                where:{
                    userId: banId
                }
            })

            await prisma.isSaved.deleteMany({
                where:{
                    userId: banId
                }
            })

            await prisma.user.delete({where:{id: banId}})

            return response.status(200).send({ message: "Conta Banida!"});
        
        }catch{
                return response.status(500).send("Erro, tente novamente")
        }
    }
}