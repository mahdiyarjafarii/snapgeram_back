import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PostCreateReqInDB } from './dtos/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
 async createPostService(
  {
    creator_id,
    caption,
    tags,
    location,
  }:PostCreateReqInDB
 ){
  try{
    const createdPost = await this.prismaService.post.create({
      data: {
        creator_id,
        caption,
        tags:["tehran"],
        location,
      },
    });
    return createdPost;

  }catch(error){
  
    console.log(error)
  }

 }

 async writeImagePathToDB({ imageUrl, post_id }: { imageUrl: string; post_id: string }) {
  try {
    const updatedPost = await this.prismaService.post.update({
      where: { post_id },
      data: { imageUrl },
    });
    return updatedPost;
  } catch (error) {
    console.log(error);
    throw error; 
  }
}
}

