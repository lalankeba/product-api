const userSchema = require('../schema/userSchema');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger/logger');

const register = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (!password) {
            throw new Error('Password is required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await userSchema.create({ name: name, username: username, password: hashedPassword });
        res.status(201).json({ message: `User: ${name} registered` });
    } catch (err) {
        logger.error('Registration error: ', err.message);
        res.status(500).json({ message: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error('Credentials are required');
        }
        const user = await userSchema.findOne({ username: username });
        if (!user) { // no user found for the provided username
            res.status(400).json({ message: 'Credentials are invalid' });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) { // password does not match
                res.status(400).json({ message: 'Credentials are invalid' });
            } else { // valid user
                const token = jsonwebtoken.sign(
                    { jwtid: uuidv4(), username: user.username, roles: user.roles }, 
                    process.env.JWT_SECRET,
                    { algorithm: 'HS512', expiresIn: '1d' }
                );
                res.status(200).json({ token });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { register, login };