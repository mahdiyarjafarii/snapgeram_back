import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PostCreateReqInDB, PostLikedReq, PostSavedReq } from './dtos/post.dto';

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

async getAllPost(
  limit ?:number,
){
  try{
    const posts=this.prismaService.post.findMany({
      take:+limit,
      orderBy:{
        created_at: 'desc',
      }, 
       include: {
        creator: true, 
      },
    })
    return posts

  }catch(error){
    console.log(error);
    throw error
  }

}

async likePostCreated({UserId,postId}:PostLikedReq){
  try{
    const likedPost=await this.prismaService.like.create({
      data:{
        user_id:UserId,
        post_id:postId
      }
    });
    return likedPost

  }catch(error){
    console.log(error);
    throw error
  }

};

async deleteLikedPost({ userId, postId }: { userId: string; postId: string }) {
  try {
    const deletedLike = await this.prismaService.like.deleteMany({
      where: {
        user_id: userId,
        post_id: postId
      }
    });
    return deletedLike;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


async savedPostCreated({UserId,postId}:PostSavedReq){
  try{
    const savedPost=await this.prismaService.save.create({
      data:{
        user_id:UserId,
        post_id:postId
      }
    });
    return savedPost

  }catch(error){
    console.log(error);
    throw error
  }

};


async deleteSavedPost({ userId, postId }: { userId: string; postId: string }) {
  try {
    const deletedSave = await this.prismaService.save.deleteMany({
      where: {
        user_id: userId,
        post_id: postId
      }
    });
    return deletedSave;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
}

