import { Request, Response } from "express";
import Plans from "../../models/plans/plans.js";
import UserCurrentPlans from "../../models/plans/users_current_plans.js";
import UserPlanHistory from "../../models/plans/users_plan_history.js";

export async function getPlans(req: Request, res: Response){
    try{
        const plans = await Plans.findAll();

        res.json(plans);

    }catch(error){
        console.log(error);
    };
}

export async function getUsersCurrentPlan(req: Request, res: Response){
    try{
        const { id_user } = req.params;

        const userCurrentPlan = await UserCurrentPlans.findOne({
            where: {
                id_user
            }
        });

        res.json(userCurrentPlan);

    }catch(error){
        console.log(error);
    }
}

export async function getUserPlanHistory(req: Request, res: Response){
    try{
        const userHistory = await UserPlanHistory.findAll();

        res.json(userHistory);
    }catch(error){
        console.log(error);
    }
}