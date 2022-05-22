const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router();
require(`../db/conn`)
const authenticate =require("../middleware/authenticate")
const User = require("../model/userSchema")
router.get("/", function (req, res) {
    res.send("home coming")
})

router.post('/register', async function (req, res) {
    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.json({ eroor: "filled the required field" })
    }
    const userExist = await User.findOne({ email: email })
    if (userExist) {
        return res.json({ eroor: "email already exist" })
    }
    const user = new User({ name, email, phone, work, password, cpassword });

    await user.save();
    res.json({ message: "registered succces" })

})

router.post('/sigin', async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "please fill the field" })
    }
    const userLogin = await User.findOne({ email: email })
    if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password)
        const token = await userLogin.genrateAuthToken();

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        })
        if (!isMatch) {
            res.status(400).json({ message: "user error" })
        }
        else {
            res.json({ message: "User  sigin succes" })
        }
    }
    else {
        res.status(400).json({ message: "User error" })
    }

})

router.get("/about",authenticate, function(req,res){
    res.send(req.rootUser);
  
})
router.get("/Logout", function(req,res){
    res.clearCookie('jwtoken',{path:"/"})
    res.status(200).send("logout");
})

module.exports = router 