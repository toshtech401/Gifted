const planModel =require('../Model/Plan')

const createPlan = async(req,res, next)=>{
    try{
        if(!req.body.price || !req.body.name){
            return res.status(400).json({error: 'All fields are required'})
        }
        const {price, name} = req.body;
        const create_plan = new planModel({price, name});
        const save_plan = create_plan.save();
        if(save_plan){
            return res.status(200).json({msg: 'success', save_plan})
        }else {
            return res.status(400).json({error: "Oops! an error occurr, please try again later"})
        }

    }
    catch(error){
        return res.status(500).json({error: 'server error'})
    }
}

const listPlan = async(req, res, next)=>{
    try{
        const find_plan = await planModel.find({});
        if(!find_plan){
            return res.status(400).json({error: 'Oops! an error occurr'})
        }else{
            return res.status(200).json({msg: 'success', find_plan})
        }
    }catch(error){
        return res.status(500).json({error: 'server error'})
    }
    
}

module.exports = {createPlan, listPlan}