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

 async updatePostServices(  {
  caption,
  tags,
  location,
  imageUrl,
  post_id
} :{
  caption:string,
  tags:any,
  location:string,
  imageUrl?:string,
  post_id:string
}){
  try{
    const updatedPost = await this.prismaService.post.update({
      where: {
        post_id
      },
      data: {
        caption,
        tags:["tehran"],
        location,
        imageUrl
      },
    });
    return updatedPost;
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
  searchTerm?: string
){
  try{
    let whereClause = {};
    if (searchTerm) {

      whereClause = {
        OR: [
          {
            caption: {
              contains: searchTerm
            }
          },
          {
            tags: {
              hasSome: [searchTerm]
            }
          }
        ]
      };
    }

    const posts = this.prismaService.post.findMany({
      take: +limit,
      where: whereClause, 
      orderBy: {
        created_at: 'desc',
      }, 
      include: {
        creator: true, 
        likes: true,
        saves: true
      },
    });

    return posts

  }catch(error){
    console.log(error);
    throw error
  }

}

async likePostCreated({userId,postId}:PostLikedReq){
  try{
    const likedPost=await this.prismaService.like.create({
      data:{
        user_id:userId,
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


async savedPostCreated({userId,postId}:PostSavedReq){
  try{
    const savedPost=await this.prismaService.save.create({
      data:{
        user_id:userId,
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

async getPostByIDService (postId:string){
  try{
    const post= await this.prismaService.post.findUnique({
      where:{
        post_id:postId
      },
      include:{
        creator:true,
        likes:true
      }
    });
    return post;

  }catch(error){
    console.log(error);
    throw error
  }
}

async deletePostByIdService(postId:string){

  try{
    await this.prismaService.like.deleteMany({
      where: {
        post_id: postId
      }
    });

    // Delete associated saves
    await this.prismaService.save.deleteMany({
      where: {
        post_id: postId
      }
    });

    // Finally, delete the post itself
    const deletedPost = await this.prismaService.post.delete({
      where: {
        post_id: postId
      }
    });

    return deletedPost;

  }catch(error){
    console.log(error);
    throw error
  }

}
}

