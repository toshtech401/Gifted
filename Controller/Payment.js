const Q = require('q')
const request = require('request')
const moment = require('moment')

async function verifyPayment(reference){
    const options ={
        'method': 'GET',
        'url': `https://api.paystack.co/transaction/verify/${reference}`,
        'headers': {
            'Authorization': 'Bearer' + process.env.payStack_Secret
        }
    }
    return new Q.Promise(async(resolve, reject)=>{
        await request(options, function(error, response){
            if(error){
                console.log('error', error)
                return reject(error)
            }
            const verification_response = JSON.parse(response.body)
            if (verification_response.status ===true && verification_response.data.status === 'success'){
                return resolve(verification_response)
            }else{
                return reject(verification_response)
            }
        })
    })
}

function calculateNextPayment(chargeType, normalDate) {
    let currentDate;

    if (!chargeType) {
        return null;
    }

    if (chargeType === 'weekly') {
        currentDate = moment(normalDate);
        currentDate.add(7, 'days');
        return currentDate.format('YYYY-MM-DD HH:mm');
    } else if (chargeType === 'monthly') {
        currentDate = moment(normalDate);
        currentDate.add(30, 'days');
        return currentDate.format('YYYY-MM-DD HH:mm');
    }
}
// const nextPaymentDateWeekly = calculateNextPayment('weekly', new Date());
// const nextPaymentDateMonthly = calculateNextPayment('monthly', new Date());

// console.log('Next Payment Date (Weekly):', nextPaymentDateWeekly);
// console.log('Next Payment Date (Monthly):', nextPaymentDateMonthly);


// function calculateNextPayment(chargeType, normalDate){
//     let currentDate;
//     if(!chargeType){
//         return null
//     }
//     if(chargeType === 'weekly'){
//         currentDate = moment(normalDate);
//         currentDate.add(7, 'days').format('YYYY-MM-DD hh-mm');
//         return currentDate
//     }else if(chargeType === 'monthly'){
//         currentDate = moment(normalDate)
//         currentDate.add(30, 'days').format('YYYY_MM_DD hh-mm')
//         return currentDate
//     }
// }

module.exports = {verifyPayment, calculateNextPayment}