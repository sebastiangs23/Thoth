import axios from "axios";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import ViewUserModel from "../../models/users/view_user_model.js";
import LanguageLevel from "../../models/language_levels/language_levels_model.js";


export async function logInUser(req: Request, res: Response) {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const emailString = Array.isArray(email) ? email[0] : email;
    if (typeof emailString !== "string") {
      return res.status(400).json({ message: "El email debe ser un string válido" });
    }

    const user = await ViewUserModel.findOne({
      where: {
        email: emailString,
      },
    });

    if (user) {
      bcrypt.compare(password as string, (user as any).password).then(function (result) {
          
          if (!user.emailVerified) {
            return res.json({
              status: "EmailNotVerified",
              message: "Please verify your email before logging in.",
              user
            });
          }else if (result == true) {
            res.json({
              status: "Successful",
              message: "Welcome back",
              user,
            });
          } else {
            res.json({
              status: "WrongPassword",
              message: "The password it´s incorrect. ",
            });
          }
        });

    } else {
      res.json({
        status: "Unauthorized",
        message: "The email doesn´t exists.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Warning",
      message: "Something goes wrong!",
    });
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
