import { Request, Response } from "express";
import { prisma } from "../../database";

export class ListAssessment{
    async handle(request: Request, response: Response){
        try{
            const {movieId} = request.params

            const assessment = await prisma.assessment.findMany({
                where: {
                    movieId
                },
               
                include:{
                    user:{
                        select:{
                            name: true,
                        }
                    }
                }
            })

            return response.status(201).json(assessment)
        } catch{
            return response.status(500).send({err: "Falha! Por favor tente novamente mais tarde."})
        }
    }
}