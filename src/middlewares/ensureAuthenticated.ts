import { NextFunction, Request, Response } from "express";
import { decode, verify } from 'jsonwebtoken'
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'fc9aa00dcbbae00b8ece1ed772752030');
    
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id as string);

    if(!user) {
      throw new Error('User does not exists!');
    }
    
    next();
  } catch(error) {
    throw new Error('Invalid token');
  }
}