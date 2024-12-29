import { Request, Response } from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { buildAndSendEmail } from "../../utils/utils.js";
import UserModel from "../../models/users/user_model.js";
import ViewUserModel from "../../models/users/view_user_model.js";
import UserLanguageLevel from "../../models/user_language_level/user_language_model.js";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, last_name, second_last_name, email, password, id_country } =
      req.body;

    //Validacion para saber si ese correo ya existe en la bd
    const emailInUse = await UserModel.findOne({
      where: {
        email,
      },
      attributes: ["email"],
    });

    if (!emailInUse) {
      const saltRounds = 5;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const code = Math.floor(Math.random() * 1000000).toString();

      const userCreated = await UserModel.create({
        id_user_type: 2,
        name,
        last_name,
        second_last_name,
        email,
        password: hashedPassword,
        id_country,
        emailVerified: false,
        codeVerified: code,
      });

      if (userCreated) {
        buildAndSendEmail(email, name, "Verificación de correo", code);

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

export async function verifiedEmail(req: Request, res: Response) {
  try {
    const { id_user } = req.params;

    await UserModel.update(
      {
        emailVerified: true,
      },
      {
        where: {
          id: id_user,
        },
      }
    );

    res.status(200).json({
      status: "Successfull",
      message: "The user was successfully updated.",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function resendVerificationCode(req: Request, res: Response) {
  try {
    const { id_user } = req.params;

    const code = Math.floor(Math.random() * 1000000).toString();

    await UserModel.update(
      {
        codeVerified: code,
      },
      {
        where: {
          id: id_user,
        },
      }
    );

    const user = await UserModel.findOne({
      where: {
        id: id_user
      }
    })

    if (user) {
      const email = user.get("email") as string;
      const name = user.get("name") as string;
    
      buildAndSendEmail(email, name, "Verificación de correo", code);
    }
    
    res.status(200).json({
      status: "Successfull",
      message: "The user was successfully updated.",
      user,
    });
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

    const userUpdate = await ViewUserModel.findOne({
      where: {
        id: id_user,
      },
    });

    res.status(200).json({
      status: "Successfull",
      data: userUpdate,
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
      status: "Successfull",
      message: "The avatar was successfully edited.",
    });
  } catch (error) {
    res.json({
      status: "Warning",
      message: "Some issue trying to update the avatar.",
    });
  }
}

export async function updateUserData(req: Request, res: Response) {
  try {
    const { id, name, last_name, second_last_name } = req.body;

    await UserModel.update(
      {
        name,
        last_name,
        second_last_name,
      },
      {
        where: {
          id,
        },
      }
    );

    res.json({
      status: "Successfull",
      message: "The user was successfully edited.",
    });
  } catch (error) {
    res.json({
      status: "Warning",
      message: "Some issue trying to update the avatar.",
    });
  }
}
