const Points = require('../Model/Points');
const spin = require('../Model/Spin');


const spinWheel = async (req, res)=>{
    const {score} = req.body;
    const user = req.user

    try {
        const userPoints = await Points.findOne({user}) 

        if(!userPoints){
            const newPoint = new Points({
                points
            })
            newPoint
            .save()
            .then()
            .catch((error)=>{
                next(error);
            });
        }
        const newPoints = userPoints.points + score;
        newPoints
        .save()
        .then()
        .catch((error)=>{
            next(error);
        });
        return res.json({msg: 'points added successfully', newPoints})
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: 'internal server error'})
    }
}


module.exports = spinWheel