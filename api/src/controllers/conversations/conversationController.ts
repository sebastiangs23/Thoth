import axios from "axios";
import { Request, Response } from "express";
import ConversationModel from "../../models/conversations/conversations_model.js";
import Dialogs from "../../models/dialogs/dialogs-model.js";

async function getConversation(req: Request, res: Response) {
  try {
    const { id_language_level } = req.params;

    const conversation = await ConversationModel.findAll({
      where: {
        id_language_level
      }
    });

    res.json(conversation);
  } catch (error) {
    console.log(error);
  }
}

async function getDialogsConversation(req: Request, res: Response) {
  try {
    const { id_conversation } = req.params;

    const dialogsConversation = await Dialogs.findAll({
      where: {
        id_conversation,
      },
    });

    //Add the property which made able to render just the first two dialogs
    let dialogsConversationsApproved = dialogsConversation.map(
      (item, index) => {
        let dialog = item.toJSON();
        if (index < 2) {
          dialog.approved = true;
        } else {
          dialog.approved = false;
        }

        return dialog;
      }
    );

    res.status(200).json(dialogsConversationsApproved);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el controlador getDialogsConversation");
  }
}

export { getConversation, getDialogsConversation };
