import { comparePassword, hashPassword } from "../helpers/helper.js";
import usermodel from "../models/usermodel.js";
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        if (!name) {
            return res.send({ error: 'Name is required' })
        }
        if (!email) {
            return res.send({ error: 'email is required' })
        }
        if (!phone) {
            return res.send({ error: 'phone number is required' })
        }
        if (!password) {
            return res.send({ error: 'password is required' })
        }
        if (!address) {
            return res.send({ error: 'address is required' })
        }

        // check existing user
        const existinguser = await usermodel.findOne({ email })
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: 'already register please login',
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);
        const user = await new usermodel({ name, email, phone, address, password: hashedPassword, }).save();
        res.status(201).send({
            success: true,
            message: "user register success",
            user,
        })



    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registrtuon',
            error

        })
    }

};

//POST


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //vlaidation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'invalid email or pass'
            });
        }
        //check user
        const user = await usermodel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email isnt registered'
            });
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid password'
            });
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: 'login success',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in login',
            error,
        });

    }
};
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};