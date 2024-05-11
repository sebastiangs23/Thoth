import ConversationContext from "../../models/conversation_context/conversation_context_model.js";
import { Request, Response } from "express";

export async function getConversationContext(req: Request, res: Response){
    try{

        const conversationContexts = await ConversationContext.findAll({});
        console.log(conversationContexts)
        console.log("conversationContexts-->")
        res.json(conversationContexts);

    }catch(error){
        console.log(error);
    }
}