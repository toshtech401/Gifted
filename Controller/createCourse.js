const Course = require("../Model/Course")
const upload = require("../MiddleWare/handleFile")


const createCourse = async (req, res) => {
    const {title, price} = req.body;
    const courseImage =req.files.courseImage

    try {
        const existingCourse = await Course.findOne({title});
        
        if(existingCourse){
            return res.status(409).json({message: "Course already exist"})   
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'Product image is required.' });
        }

        const imageUpload = __dirname + '/uploads/' + courseImage.name;

        const newCourse = await Course.create({
            title,
            price,
            courseImage: imageUpload
        });
    
        res.json({message: 'New Course successfully added!!!', course: newCourse});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

}


const getAllCourse =  async(req, res) =>{
    try {
        const courses = await Course.find();
        if(!courses) throw new Error("No course found")
        return res.json(courses);
      } catch (error) {
        res.status(500).json({ error: "Failed To Fetch All Course" });
      }
}



module.exports = {
    createCourse,
    getAllCourse
}