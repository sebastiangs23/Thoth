import axios from "axios";
import { Request, Response } from "express";
import ConversationModel from "../../models/conversations/conversations_model.js";

export default async function getConversation(req: Request, res: Response){
    try{
        const { id_context, id_language_level } = req.query;

        const conversation = await ConversationModel.findAll({});

        res.json({
            conversation
        })

    }catch(error){
        console.log(error)
    }
}