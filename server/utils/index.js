import jwt from "jsonwebtoken";
export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, "AdityaJain2024", {
    expiresIn: "1d",
  });
  return token
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   // secure: false,
  //   secure: process.env.NODE_ENV !== "development",
  //   maxAge: 1000 * 60 * 60 * 24 * 1, //1 day
  //   sameSite: "strict", //prevent csrf attack
  //   // sameSite: "none",
  // });
};
