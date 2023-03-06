import { sign, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET as string;

const generateToken = (payload: unknown, expiresIn = '10d') => {
  const options: SignOptions = {
    expiresIn,
    algorithm: 'HS256',
  };
  const token = sign({ payload }, secret, options);
  return token;
};

export default generateToken;
