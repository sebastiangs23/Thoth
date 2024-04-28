import { Request, Response } from "express";

export async function createUser(req: Request, res: Response){
    try{
        let objeto = {
            nombre : 'Sebastian'
        };

        res.json(objeto);

    }catch(error){
        res.json({
            message:'Error en el controlador createUsers ' + error
        })
    }
}