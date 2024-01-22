const UserModel = require("../Model/User")


const Admin = async(req, res)=>{
  const username = req.params.username;

  try {
    const user = await UserModel.findByIdAndUpdate(username, { isAdmin: true }, { new: true }, );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User is now an admin', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = Admin