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


};

export class PostUpdateReq{
    @IsString()
    caption: string;

    @IsString()
    location : string;

    @IsString()
    post_id : string;
    
    @IsString()
    tags : string[];
    @IsString()
    imageUrl?: string;

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

export class PostLikedReq{
    @IsString()
    userId: string;

    @IsString()
    postId : string;
}

export class PostSavedReq{
    @IsString()
    userId: string;

    @IsString()
    postId : string;
}