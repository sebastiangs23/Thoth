import { Request, Response } from "express";
import UserModel from "../../models/users/user_model.js";
import UserLanguageLevel from "../../models/user_language_level/user_language_model.js";

export async function getUsers(req: Request, res: Response) {
  try {
    const { data } = req.params;

    // const users = await UserModel.findAll({});

    res.json({
      sebas: "CEEEEEEEEEEEB",
    });
  } catch (error) {
    res.json({
      message: "Error trying to bring the users.",
    });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const {
      name,
      last_name,
      second_last_name,
      email,
      password,
      birth_country,
      residence_country,
    } = req.body;

    console.log(req.body);

    const userCreated = await UserModel.create({
      id_user_type: 2,
      name,
      last_name,
      second_last_name,
      email,
      password,
      birth_country,
      residence_country,
    });

    if (userCreated) {
      res.json({
        status: "Successful",
        message: "The user was successfully created!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 'Warning',
      message: 'Some issue trying to create the user.'
    });
  }
}

export async function updateUserLanguageLevel(req: Request, res: Response) {
  try {
    const { id_user, id_language_level } = req.body;

    await UserLanguageLevel.update(
      {
        id_language_level,
      },
      {
        where: {
          id_user,
        },
      }
    );

    res.status(200).json({
      status: "Successfull",
      message: "The level was successfully edited.",
    });
  } catch (error) {
    console.log(error);
  }
}
