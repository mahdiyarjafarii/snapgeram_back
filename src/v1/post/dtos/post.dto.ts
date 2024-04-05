import {IsEmail , IsOptional, IsString, MinLength } from 'class-validator';

export class PostCreateReq{
    @IsString()
    caption: string;

    @IsString()
    location : string;

    @IsString()
    creator_id : string;
    
    @IsString()
    tags : string[];

    image : any;


}

export class PostCreateReqInDB{
    @IsString()
    caption: string;

    @IsString()
    location : string;

    @IsString()
    creator_id : string;
    
    @IsString()
    tags : string[];

    @IsOptional()
    imageUrl? : any;


}