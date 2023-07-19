import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';


export function generateToken(data: Object): string {
  const privateKey = fs.readFileSync("./secrets/private.key", "utf8");
  const expiresIn = 60 * 60 * 3; // 3h

  return jwt.sign(data, privateKey, { algorithm: "RS256", expiresIn, });
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).send({ error: 'No token provided' });
    return;
  }
  const publicKey = fs.readFileSync("./secrets/public.key", "utf8");

  jwt.verify(token, publicKey, (err, decodedToken) => {
    if (err) {
      return res.status(403).send({ error: 'Invalid token' });
    }
    req.body.decodedToken = decodedToken;
    next();
  });
}
