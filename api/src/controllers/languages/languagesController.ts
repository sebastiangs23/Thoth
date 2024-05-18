import { Request, Response } from "express";
import Language from "../../models/language/language_model.js";

export default async function getLanguages(req: Request, res: Response){
    try{
        const languages = await Language.findAll();

        res.json(languages);

    }catch(error){
        console.log(error);
        res.status(403).send(error);
    }
}