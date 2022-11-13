import { NextFunction, Request, Response } from "express";
import { decode, verify } from 'jsonwebtoken'
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'fc9aa00dcbbae00b8ece1ed772752030');
    
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id as string);

    if(!user) {
      throw new AppError('User does not exists!', 401);
    }
    
    next();
  } catch(error) {
    throw new AppError('Invalid token', 401);
  }
}