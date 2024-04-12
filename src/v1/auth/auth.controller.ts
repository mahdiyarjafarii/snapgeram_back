import { Controller, Get, HttpException, Post,Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateReq, UserForgetPassReq, UserLoginReq, UserResetPassReq } from './dtos/auth.dto';
import { Body, Query, Req } from '@nestjs/common/decorators';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  //for login api
  @Post('login')
  async loginUser(@Body() userLoginDto: UserLoginReq) {
    const existingUser = await this.authServices.findeByEmail(
      userLoginDto.email,
    );
    if (!existingUser) {
      throw new HttpException('user is notfound', 401);
    }

    const resultComapre = await bcrypt.compare(
      userLoginDto.password,
      existingUser.passwordHash,
    );
    if (resultComapre) {
        const token = await this.authServices.generateToken(
          existingUser.user_id,
        );
        return { access_token: token };
      
    } else {
      throw new HttpException('Password is not match', 401);
      // return { message: 'password is not match' };
    }
  }

  //for signup api
  @Post('register')
  async signUpUser(@Body() userCreatDTO: UserCreateReq) {
    const existingUser = await this.authServices.findeByEmail(
      userCreatDTO.email,
    );

    if (existingUser) {
      throw new HttpException('Email already registered', 401);
    }

    const userCreated = await this.authServices.creatUser(userCreatDTO);
    return userCreated;
  }

  @Get("auth-check")
  async checkUser (@Headers('authorization') authorizationHeader: string){
    return this.authServices.getUserWithToken(authorizationHeader)
  }

  @Get("/")
  async getUserId(
    @Query("userId") userId?: string,
  ){
    return this.authServices.getUserById(userId)
  }

}
