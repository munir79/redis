
// import jwt from 'jsonwebtoken';
// import { User } from '../module/user/user.model.js';

// export const protect=async(req,res, next)=>{

//   let token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token, authorization denied" });

//      try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         req.user=await User.findById(decoded.userId).select("-password");
//         next();

//      }
//      catch(err){
//     res.status(401).json({ message: "Token is not valid" });
//      }


// }


// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Not authorized for this action" });
//     }
//     next();
//   };
// };