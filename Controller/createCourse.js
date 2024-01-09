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

const getCourse = async(req,res)=>{
    try {
        const {courseId} = req.params;

        const course = await Course.findById(courseId);

        if(!course) return res.status(404).json({msg: "Course not found"})

        return res.json({course})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server error"})
    }
}

const updateCourse = async(req, res)=>{
    try {
        const {courseId} = req.params;
        const upCourse = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            upCourse,
            {new:true, runValidators: true}
        );
        if(!updatedCourse) return res.status(404).json({msg: "Course not found"})

        return res.json({msg: "Course updated successfully", course: updatedCourse})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server error"})
    }
}



const deleteCourse = async(req, res)=>{
    try {
        const {courseId} = req.params
        const deletedCourse = await Product.findByIdAndDelete(courseId)
        if (!deletedCourse){
            return res.status(404).json({error: 'Course not found', success: false});
        }
        return res.json({message: "Course deleted", business: deletedCourse, success: true});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server Error", success: false})
    }
}

module.exports = {
    createCourse,
    getAllCourse,
    getCourse,
    updateCourse,
    deleteCourse
}