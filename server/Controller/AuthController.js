import UserModel from "../Model/UserModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// body check middleware

export const bodyCheck = async (req, res, next) => {
    if (!req.body.email && !req.body.password) {
        console.log("vooo")
        return res.json({ message: "No body data" })
    }

    next()

}


export const SignUp = async (req, res) => {
    const { email } = req.body

    try {
        const old = await UserModel.findOne({ email })
        if (old) {

            return res.status(405).json("Already registerd")
        } else {

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPass

            const user = await UserModel.create(req.body)

            const token = jwt.sign({
                username: user.name, id: user._id
            }, "aji", { expiresIn: "1h" })
            return res.status(201).json({ message: "Register successfull", token })
        }

    } catch (error) {
        console.log("signup error ", error)
    }
}

export const login = async (req, res) => {
    console.log(req.body)
   try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (user) {
        const validity = await bcrypt.compare(password, user.password)
        console.log(validity)
        if (!validity) {
            res.status(400).json({ message: "Wrong password" })
        } else {
            const token = jwt.sign({
                username: user.name, id: user._id
            }, "aji", { expiresIn: "1h" })
            res.json({ user, token })
        }
    }
   } catch (error) {
    console.log("Login err",error)
   }

}