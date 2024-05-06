const userSchema = require('../schema/userSchema');
const bcrypt = require('bcryptjs');

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
        console.error('Registration error: ', err.message);
        res.status(500).json({ message: err.message });
    }
}

module.exports = { register };