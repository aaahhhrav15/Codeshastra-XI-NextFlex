import User from '../models/UserModel.js';


export default async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: 'Access denied' });

    const token = authHeader.split(' ')[1];

    try {
        const user = await User.findOne({ tokens: token });
        if (!user) return res.status(401).json({ message: 'Invalid token' });

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
