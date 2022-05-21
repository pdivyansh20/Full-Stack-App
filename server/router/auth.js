const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router();
require(`../db/conn`)
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
        return res.json({ error: "please fill the field" })
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
            res.json({ message: "user error" })
        }
        else {
            res.json({ message: "User  sigin succes" })
        }
    }
    else {
        res.json({ message: "User error" })
    }

})

module.exports = router 