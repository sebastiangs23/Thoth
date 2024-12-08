import { Request, Response } from "express";
import Plans from "../../models/plans/plans_model.js";
import UserCurrentPlans from "../../models/plans/users_current_plans_model.js";
import UserPlanHistory from "../../models/plans/users_plan_history_model.js";

export async function getPlans(req: Request, res: Response){
    try{
        const plans = await Plans.findAll({
            attributes: ['id', 'name', 'price_usd', 'description', 'icon_name', 'icon_type']
        });

        res.json(plans);

    }catch(error){
        console.log(error);
        res.status(500).send('Error in the getPlans controller');
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
        res.status(500).send('Error in the getUserCurrentPlan controller');
    }
}

export async function getUserPlanHistory(req: Request, res: Response){
    try{
        const userHistory = await UserPlanHistory.findAll();

        res.json(userHistory);
    }catch(error){
        console.log(error);
        res.status(500).send('Error in the getUserPlanHistory');
    }
}