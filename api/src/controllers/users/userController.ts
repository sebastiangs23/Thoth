import { Request, Response } from "express";
import UserModel from "../../models/users/user_model.js";

export async function getUsers(req: Request, res: Response) {
  try {
    const { data } = req.params;

    // const users = await UserModel.findAll({});

    console.log('Se esta consumiento el endpoint de manera exitosa!');

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
    const { name, last_name, second_last_name, email, password, birth_country, residence_country  } = req.body;

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

    if(userCreated){
        res.json({
            status: 'Success',
            message: 'Su usuario se creo de manera exitosa!'
        })
    }

  } catch (error) {
    console.log(error)
    console.log(error)
    res.json({ error });
  }
}