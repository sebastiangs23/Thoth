import { Request, Response } from "express";
import Language from "../../models/language/language_model.js";
import LanguageLevel from "../../models/language_levels/language_levels_model.js";

export async function getLanguages(req: Request, res: Response){
    try{
        const languages = await Language.findAll();

        res.json(languages);

    }catch(error){
        console.log(error);
        res.status(403).send(error);
    }
}

export async function getLanguagesLevels(req: Request, res: Response){
    try{
        const languagesLevels = await LanguageLevel.findAll();
        
        res.json(languagesLevels);

    }catch(error){
        console.log(error);
        res.status(403).send(error);
    }
}