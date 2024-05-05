import axios from "axios";
import { Request, Response } from "express";
import UserTypeModel from "../../models/user_type/user_type_model.js";
import UserModel from "../../models/users/user_model.js";
import LanguageLevel from "../../models/language_levels/language_levels_model.js";

export async function logInUser(req: Request, res: Response) {
  try {
    const { email, password } = req.query;
    console.log(req.query);

    console.log("lo que me llega x query!");

    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (user) {
      if ((user as any).password == password) {
        res.json({
          user,
        });
      } else if ((user as any).password != password) {
        res.json({
          status: 'Error',
          message: "Unauthorized: Incorrect password."
        });
      }
    } else {
      res.json({
        status: 'Error',
        message: "Unauthorized: User doesn´t exists."
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

export async function getCountries(req: Request, res: Response) {
  try {
    const countries = await axios.get("https://restcountries.com/v3.1/all");

    const countriesNecessary = countries.data.map((item: any) => {
      let country = {
        name: item.name.common,
        flag: item.flags,
        nationatity: item.demonyms ? item.demonyms.eng.f : null,
        iso_code: item.cca2,
      };

      return country;
    });

    if (countriesNecessary) {
      res.status(200).send(countriesNecessary);
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Error",
      message: "Error trying to get countries",
    });
  }
}

export async function getLevels(req: Request, res: Response) {
  try {
    const levels_cefr = await LanguageLevel.findAll();

    res.json({ levels_cefr });
  } catch (error) {
    console.log("Error en el controlador getLevels ", error);
    res.json({
      status: "Error",
      message: "Error trying to bring the levels.",
    });
  }
}
