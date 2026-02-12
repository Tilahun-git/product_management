import jwt from "jsonwebtoken";

export function signToken(user: any) {
  const payload = {
    id: user.ID,
    email: user.email,
    isAdmin: user.isAdmin,
    roles: user.roles || [] 
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
