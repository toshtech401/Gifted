const cron = require('node-cron');
const User = require("./Model/User");
const moment = require("moment");

cron.schedule('* * * * *', async function (req, res, next) {
    let todayDate = moment(new Date()).format("YYYY-MM-DD hh:mm");
    const findUsers = await User.find()
    if (findUsers) {
        for (let i = 0; i < findUsers.length; i++) {
            let users = findUsers[i];
            let userDueDate = moment(users.next_PaymentDate).format("YYYY-MM-DD hh:mm");
            if (todayDate === userDueDate) {
                let finduser = await User.findById(users._id);
                finduser.isPaid = false;
                finduser.save()
            }
        }
    }
})