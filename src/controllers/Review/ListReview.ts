import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListReview{
    async handle(request: Request, response: Response){
        try{
            const {movieId} = request.params

            const review = await prisma.review.findMany({
                where: {
                    movieId
                },
               
                include:{
                    user:{
                        select:{
                            name: true,
                            imgIndex: true
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