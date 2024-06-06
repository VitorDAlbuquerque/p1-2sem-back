import { Request, Response } from "express";
import { prisma } from "../../database";

export class SearchUsers {
    async handle(request: Request, response: Response){
        const {username} = request.body
        const users = await prisma.user.findMany({
            where:{
                OR:[
                    {
                        username:{
                            contains: username,
                            mode: 'insensitive',
                        }
                    },
                    {
                        name: {
                            contains: username,
                            mode: 'insensitive',
                        }
                    }
                ]
            }
        })
        return response.json(users)
    }
}