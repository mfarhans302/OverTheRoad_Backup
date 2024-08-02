const jwt = require('jsonwebtoken');
const makeApiResponse = require('../lib/response');


const generateAccessToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    return token
};



// const verifyAccessToken = (req, res, next) => {
//     try {
//         const token = req.header("Authorization")?.replace("Bearer ", "");
//         if (!token) {
//             const unauthorizedResponse = makeApiResponse("Unauthorized Request", 'error', 401);
//             return res.status(401).json(unauthorizedResponse);
//         }
//         const isValid = jwt.verify(token, process.env.JWT_SECRET);
//         if (!isValid) {
//             const unauthorizedResponse = makeApiResponse("Unauthorized Request", 'error', 401);
//             return res.status(401).json(unauthorizedResponse);
//         }
//         req.user = isValid.user; // Assuming your JWT payload includes a 'user' field
//         next();
//     } catch (err) {
//         console.error('Invalid Token:', err);
//         const errorResponse = makeApiResponse("Invalid Token", 'error', 401);
//         return res.status(401).json(errorResponse);
//     }
// };

// middlewares/auth.js


const verifyAccessToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            const unauthorizedResponse = makeApiResponse("Unauthorized Request", 'error', 401);
            return res.status(401).json(unauthorizedResponse);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.user) {
            const unauthorizedResponse = makeApiResponse("Unauthorized Request", 'error', 401);
            return res.status(401).json(unauthorizedResponse);
        }

        req.user = decoded.user; // Assuming your JWT payload includes a 'user' field
        next();
    } catch (err) {
        console.error('Invalid Token:', err);
        const errorResponse = makeApiResponse("Invalid Token", 'error', 401);
        return res.status(401).json(errorResponse);
    }
};







module.exports = { verifyAccessToken, generateAccessToken }