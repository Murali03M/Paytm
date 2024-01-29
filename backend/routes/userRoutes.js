const express = require('express')
const zod = require('zod')
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require('../model/userModel');
const { authMiddleware } = require('../middleware/authMiddleware');
const {Account} =require('../model/accountModel')

const singupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()


})


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


router.post('/signup', async (req, res) => {

    try {


     const success = singupBody.safeParse(req.body);
     if (!success) {
         return res.status(411).json({
                message:"email is Already taken/invalid"
            })
     }
     
 
     const existingUser = await User.findOne({
         username :req.body.username
     })
 
     
     if (existingUser) {
         return res.status(411).json({
             message: "Email already taken/Incorrect inputs"
         })
     }
 
     const user = await User.create({
         username: req.body.username,
         password: req.body.password,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
     })
        const userId = user._id;
        
        // Account creattion

        await Account.create({
            userId,
            balance:1+Math.random()*10000
        })
 
     const token = jwt.sign({
         userId
     }, JWT_SECRET);
 
     res.json({
         message: "User created successfully",
         token: token
     })
        
    } catch (error) {

        res.json({ message: error.message })
        
    }

})


router.post("/signin", async (req, res) => {
    
    try {
        
    const success = signinBody.safeParse(req.body);
    if (!success)
    {
        return res.status(411).json({
            message: "Incorect input"
        })

    }
    
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    
        if(user) 
        {
            const token = jwt.sign({
                userId: user._id
                
            }, JWT_SECRET);


            return res.json({
                token:token
            })
        }
    } catch (error) {
        res.status(411).json({
             message:error.message
         })
    }



    
})

const updateBody = zod.object({

    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})


router.put("/update",authMiddleware, async (req, res) => {

    try {
        const success = updateBody.safeParse(req.body);

        if (!success)
        {
            return res.status(411).json({
                message:"Error updating"
            })
        }
        const user = await User.findOneAndUpdate({
            _id: req.userId
        },
        { $set: req.body },
            {new:true}
        )
    
        res.status(200).json({
            message: "updated successfully",
            user:user
        })
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

router.get("/bulk", async (req, res) => {

    try {

        const filter = req.query.filter || "";

        const users = await User.find({
                $or: [{
                    firstName: {
                        "$regex": filter,
                        "$options": "i"
                    },
                    lastName: {
                        "$regex": filter,
                        "$options": "i"
                    }
                }]
            }
        )



    

        res.json({
            user: users.map((user) => ({
                    username :user.username,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    _id : user.id
            }))
        })
        
    } catch (error) {

        res.json({ message: error.message })
        
    }

})





module.exports = router;

