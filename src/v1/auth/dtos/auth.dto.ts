import {IsEmail , IsString, MinLength } from 'class-validator';


export class UserCreateReq{
    @IsString()
    name: string;

    @IsString()
    userName : string;

    @IsEmail()
    email :string

    @IsString()
    @MinLength(8)
    password:string

}
export class UserLoginReq{

    @IsEmail()
    email :string

    @IsString()
    password:string

}

export class UserForgetPassReq{
  @IsString()
  email :string
}

export class UserResetPassReq{
  @IsString()
  token:string

  @IsString()
  newPassword:string
}


export class UserEntity {
    constructor(partial: Partial<UserEntity>) {
      Object.assign(this, partial);
    }
    user_id:string
    name: string;
    userName: string;
    email: string;
    passwordHash:string
    isAuthenticated?:boolean

  }
  
