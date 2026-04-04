// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   try {
//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined");
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    // const token = req.cookies.token;

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // ✅ THIS is what you need

    next();
  } catch (error) {
    console.error("Protect error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
