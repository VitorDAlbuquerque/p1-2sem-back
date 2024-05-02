import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListReviewByUser{
    async handle(request: Request, response: Response){
        try{
            const {userId} = request.params

            const review = await prisma.review.findMany({
                where: {
                    userId
                },
               
                include:{
                    user:{
                        select:{
                            name: true,
                        }
                    }
                },
                orderBy:{
                    createdAt: "desc"
                }
            })

            return response.status(201).json(review)
        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}