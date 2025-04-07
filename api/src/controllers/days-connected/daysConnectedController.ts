import { Request, Response } from "express";
import usersDaysConnected from "../../models/days_connected/days_connected.js";

export async function getDaysConnected(req: Request, res: Response) {
  try {
    const { id_user } = req.params;

    if (id_user) {
      const daysConnected = await usersDaysConnected.findAll({
        where: {
          id_user,
        },
      });

      res.json(daysConnected);
    } else {
        res.json({
            status: 'Warning',
            message: 'You forgot to send the id_user.'
        })
    }
  } catch (error) {
    res.json({
      status: "Error",
      message: "Failed to get the days connected, please try again later.",
    });
  }
}

export async function createDayConnected(req: Request, res: Response) {
    try {
      const { id_user, date } = req.body;
  
      if (id_user && date) {
        const existingDay = await usersDaysConnected.findOne({
          where: {
            id_user,
            date,
          },
        });
  
        if (existingDay) {
          return res.json({
            status: "Warning",
            message: "This day is already connected for the user.",
          });
        }
  
        await usersDaysConnected.create({
          id_user,
          date,
        });
  
        res.json({
          status: "Success",
          message: "The day connected was created successfully!",
        });
      } else {
        res.json({
          status: "Warning",
          message: "You forgot to send the id_user or date.",
        });
      }
    } catch (error) {
      res.json({
        status: "Error",
        message: "Failed to create the day connected, please try again later.",
      });
    }
  }
