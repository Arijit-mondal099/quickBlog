import jwt from "jsonwebtoken";

const authValidation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication error",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decode;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication error",
    });
  }
};

export default authValidation;
