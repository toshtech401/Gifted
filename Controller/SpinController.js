const spin = require('../Model/Spin')

const spinWheel = (req, res)=>{
    const spin = req.body;
    

    res.json({spin})
}