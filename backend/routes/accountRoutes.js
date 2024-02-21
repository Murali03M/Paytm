const express = require("express")
const mongoose = require("mongoose")
const router = express.Router();
const { Account } = require('../model/accountModel');
const { User } = require('../model/userModel');
const { authMiddleware } = require("../middleware/authMiddleware");

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        const user = await User.findOne({
            _id: req.userId
        });

        // Check if the account object exists before accessing its properties
        if (account) {
            res.json({
                firstName: user.firstName,
                lastName: user.lastName,
                balance: account.balance
            });
        } else {
            res.status(404).json({
                message: 'Account not found'
            });
        }
    } catch (error) {
        res.status(403).json({
            message: error.message
        });
    }
});



router.post('/transfer', authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();
  
  

    try {

        console.log('Received transfer request:', req.body);

        const { amount, to } = req.body;


        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance/Invalid acccount"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    
    
        await session.commitTransaction();
        res.json({
            success :true,
            message: "Transfer successful"
        });
    


    //     const { amount, to } = req.body;

    //     console.log(to);

    // const account = await Account.findOne({
    //     userId:req.userId
    // })

    // if (account.balance < amount) {
    //     return res.status(400).json({
    //         message: "Insufficient balance"
    //     })
    // }

    // const toAccount = await Account.findOne({

    //     userId:to
    // })


    // if (!toAccount)
    // {
    //     return res.status(400).json({
    //         message:'Account not found'
    //     })
        
    // }
    
    // await Account.updateOne({
    //     userId:req.userId
    // },
    //     {
    //         $inc: {
    //         balance : -amount
    //     }
    //     })
    
    
    // await Account.updateOne({
    //     userId:to
    // },
    //     {
    //         $inc: {
    //             balance : amount
    //         }
        
    //     })
    
    //     res.json({
    //         message: "Transfer successful"
    //     })
        
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
        
    }




    
    
    
})









module.exports =router