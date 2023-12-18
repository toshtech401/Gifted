const { default: axios } = require("axios");
const Transaction = require("../Model/Transaction");
const Wallet = require("../Model/Wallet");

SECRET_KEY = process.env.SECRET_KEY

const initializePayment = async (email, amount)=>{
    try {
        const initResponse = await axios.post(
            'https://api.paystack.co/transaction/initialize',
             {email, amount}, 
             {
                headers: {
                    Authorization: `Bearer ${SECRET_KEY}`
                },
             }
        );
        const reference = initResponse.data.data.reference;
        return reference
    } catch (error) {
        console.error('Error initializing transaction:', error.message);
        res.json({error: 'Error initializing payment'});
    }
};


const initializeAndRedirect = async (req, res) => {
    const user = req.user;
    const { email, amount } = req.body;

    try {
        const reference = await initializePayment(email, amount);
        res.json({ reference });
    } catch (error) {
        console.error('Error initializing and redirecting:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};



const fundWallet = async (req, res) => {
    const user = req.user;
    const { amount, reference } = req.body;

    try {
        if (!amount || !reference) {
            return res.status(400).json({error: 'Reference or amount is required'});
        }

        let wallet = await Wallet.findOne({ user }) || new Wallet({ user, current_balance: 0, previous_balance: 0 });
        const userBalance = wallet.current_balance;

        const transaction = new Transaction({
            user: user,
            old_balance: wallet.previous_balance,
            new_balance: wallet.current_balance,
            amount: amount / 100,
            type: 'credit',
            status: 'pending',
            description: `Wallet funding with ${amount / 100}`,
            reference,
        });

        // Verify the payment
        // await verifyPayment(reference);

        // Update transaction status to completed
        transaction.status = 'completed';

        const amount_paid = amount / 100;
        wallet.previous_balance = userBalance;
        wallet.current_balance = userBalance + amount_paid;
        transaction.new_balance = wallet.current_balance;

        // Save wallet and transaction
        await Promise.all([wallet.save(), transaction.save()]);

        // Send a successful response
        res.status(200).json({
            message: 'Verification successful',
            status: true,
            data: {
                balance: wallet.current_balance,
            },
        });
    } catch (error) {
        console.error('Error funding wallet:', error.message);

        // Send an error response only if the response hasn't been sent
        if (!res?.headersSent) {
            res?.status(422).json({
                message: error.message,
                success: false,
            });
        }
    }
};



module.exports = {initializeAndRedirect, fundWallet}