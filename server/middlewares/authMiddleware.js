import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // console.log("authMiddleware entered");
  try {
    const userToken = req.headers.authorization;
    // console.log("header:", userToken);
    if (!userToken || !userToken.startsWith("Bearer ")) {
      return res.send({
        status: false,
        message: "Unauthorized! Please login again",
      });
    }

    const secret = "lemonmalt";

    const token = userToken.split(" ")[1];
    //  console.log("token extracted");

    const decoded = jwt.verify(token, secret);
    // console.log("jwt verified");

    req.user = decoded;
    // console.log("calling next()");
    next();
  } catch (err) {
    console.log("JWT ERROR:", err);

    return res.status(401).json({
      message: err.message,
    });
  }
};
