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
      id_country,
    } = req.body;

    console.log(req.body);

    //Validacion para saber si ese correo ya existe en la bd
    const emailInUse = await UserModel.findOne({
      where: {
        email,
      },
      attributes: ["email"],
    });

    console.log("emailInUse");
    console.log(emailInUse);

    if (!emailInUse) {
      const userCreated = await UserModel.create({
        id_user_type: 2,
        name,
        last_name,
        second_last_name,
        email,
        password,
        id_country,
      });

      if (userCreated) {
        res.json({
          status: "Successful",
          message: "The user was successfully created!",
          user: userCreated,
        });
      }
    } else if (emailInUse) {
      res.json({
        status: "Warning",
        message: "This email its already in use.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Warning",
      message: "Some issue trying to create the user.",
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
    res.json({
      status: "Warning",
      message: "Some issue trying set the user'language.",
    });
  }
}

export async function updateUserAvatar(req: Request, res: Response) {
  try {
    const { id_user, avatar } = req.body;

    await UserModel.update(
      {
        avatar,
      },
      {
        where: {
          id: id_user,
        },
      }
    );

    res.json({
      status: 'Successfull',
      message: 'The avatar was successfully edited.'
    });
  } catch (error) {
    res.json({
      status: 'Warning',
      message: 'Some issue trying to update the avatar.'
    })
  }
}
