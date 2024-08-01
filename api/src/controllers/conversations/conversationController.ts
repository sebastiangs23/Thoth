import axios from "axios";
import { Request, Response } from "express";
import Areas from "../../models/areas/areas_model.js";
import ConversationModel from "../../models/conversations/conversations_model.js";
import Dialogs from "../../models/dialogs/dialogs-model.js";
import SpecificTopics from "../../models/specific_topic/specific_topic_model.js";

async function getAreas(req: Request, res: Response) {
  try {
    const areas = await Areas.findAll({
      attributes: ["id", "description"],
    });

    res.json(areas);
  } catch (error) {
    console.log(error);
  }
}

async function getSpecificTopics(req: Request, res: Response) {
  try {
    const { id_area } = req.params;

    const specific_topic = await SpecificTopics.findAll({
      where: {
        id_area,
      },
      attributes: ["id", "description", "id_area"],
    });

    res.json(specific_topic);
  } catch (error) {
    console.log(error);
  }
}

async function getDialogs(req: Request, res: Response) {
  try {
    const { id_specific_topic } = req.params;

    //Aca una lógica para que me traiga solo dialogos de un tema en espeficio de manrea random

    const dialogs = await Dialogs.findAll({
      where: {
        id_specific_topic,
      },
      attributes: [
        "id",
        "person",
        "dialog",
        "order",
        "id_specific_topic",
        "id_language_level",
      ],
    });

    //Add the property which made able to render just the first two dialogs
    let dialogsConversationsApproved = dialogs.map(
      (item: any, index: any) => {
        let dialog = item.toJSON();
        if (index < 2) {
          dialog.approved = true;
        } else {
          dialog.approved = false;
        }

        return dialog;
      }
    );

    res.json(dialogsConversationsApproved);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el controlador getDialogs");
  }
}

export {
  getAreas,
  getSpecificTopics,
  getDialogs,
};
