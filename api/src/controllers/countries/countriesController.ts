import axios from "axios";
import { Request, Response } from "express";
import CountriesModel from "../../models/countries/countries_model.js";

export async function createCountries(req: Request, res: Response) {
  try {
    const countries = await axios.get("https://restcountries.com/v3.1/all");

    countries.data.map(async (item: any) => {
      let country = {
        name: item.name.common,
        flag: item.flags,
        nationality: item.demonyms ? item.demonyms.eng.f : null,
        iso_code: item.cca2,
      };

      await CountriesModel.create(country);
    });

    res.status(200).json({
        message: 'Se crearón los countries de manera exitosa, esta vaina solo se ejecutara 1 vez.',
        data: countries
    });
    
  } catch (error) {
    console.log("Error al tratar crear los countries: ", error);
    res.status(500).send(error);
  }
}

export async function getCountries(req: Request, res: Response){
  try{
    const countries = await CountriesModel.findAll();

    res.json(countries);
  }catch(error){
    console.log('Error trying to get the countries: ', error);
    res.status(500).send(error);
  }
}
