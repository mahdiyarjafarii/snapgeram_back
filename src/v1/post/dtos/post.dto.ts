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