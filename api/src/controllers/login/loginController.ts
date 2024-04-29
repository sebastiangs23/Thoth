import { Request, Response } from "express";
import UserTypeModel from "../../models/userType/userTypeModel.js";
import axios from 'axios';

export async function createUser(req: Request, res: Response){
    try{
        const users = await UserTypeModel.findAll({});

        console.log('Solo para crear el modelo de UserType ',  UserTypeModel);

        let objeto = {
            nombre : 'Sebastian'
        };

        res.json(objeto);

    }catch(error){
        res.json({
            message:'Error en el controlador createUsers ' + error
        })
    }
}

export async function getCountries(req: Request, res: Response){
    try{
        const countries = await axios.get('https://restcountries.com/v3.1/all')

        const countriesNecessary = countries.data.map((item: any) => {
            let country = {
                name: item.name.official,
                flag: item.flags,
                nationatity: item.demonyms ? item.demonyms.eng.f : null,
                iso_code: item.cca2,
            }

            return country;
        });

        if(countriesNecessary){
            res.status(200).send(countriesNecessary);
        }

    }catch(error){
        console.log(error);
        res.json({
            status: 'Error',
            message: 'Error trying to get countries'
        })
    }
}