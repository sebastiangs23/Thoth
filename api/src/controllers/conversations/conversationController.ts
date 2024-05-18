import axios from "axios";
import { Request, Response } from "express";
import ConversationModel from "../../models/conversations/conversations_model.js";
import Dialogs from "../../models/dialogs/dialogs-model.js";

async function getConversation(req: Request, res: Response){
    try{
        const { id_language_level } = req.query;

        const conversation = await ConversationModel.findAll({});
        console.log(conversation)
        console.log("conversation HERE")
        res.json(conversation);

    }catch(error){
        console.log(error)
    }
};

async function getDialogsConversation(req: Request, res: Response){
    try{
        const { id_conversation } = req.params;

        const dialogsConversation = await Dialogs.findAll({
            where : {
                id_conversation
            }
        });

        res.status(200).json(dialogsConversation);

    }catch(error){
        console.log(error);
        res.status(500).send('Error en el controlador getDialogsConversation');
    }
}

export { getConversation, getDialogsConversation };