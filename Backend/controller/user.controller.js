import User from "../modal/user.model.js";
import bcryptjs from "bcryptjs"


export const signup = async (req,res) => {
    try {
        const {fullname,email,password}= req.body;
        const user = await User.findOne({email})

        if (user) {
            return res.status(400).json({message: "user already exist"})
        }
const hashPassword = await bcryptjs.hash(password, 10);
const createUser = new User({
    fullname: fullname,
    email: email,
    password: hashPassword,

});
await createUser.save();
res.status(201).json({message: "User created successfully",
    user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
    },
})

    } catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({message:" internal server error"});
    }
};

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({message: "invalid username or password"});
        }
        else{
            res.status(200).json({message: "login successfully",
                user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            },
        });
        }
    } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({message: "internal server error"})
    };
};