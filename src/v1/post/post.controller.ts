import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { cwd } from 'process';
import { existsSync, mkdirSync, renameSync } from 'fs';
import { PostCreateReq, PostLikedReq, PostSavedReq } from './dtos/post.dto';


@Controller(
    {
        path: 'post',
        version: '1',
      }
)
export class PostController {
  constructor(private readonly postService: PostService) {}



  @Get('/')
  async getAllPost(
    @Query("limit") limit?: number,
  ){
    return await this.postService.getAllPost(limit);
  }

  @Post('/like')
  async likePost(
    @Body() likePostDTO: PostLikedReq
  ){
    return await this.postService.likePostCreated(likePostDTO);
  };


  @Post('/like/delete')
    async deleteLikedPost(
  @Body() deleteLikeDTO: { userId: string; postId: string }
) {
  return await this.postService.deleteLikedPost(deleteLikeDTO);
}

  @Post('/save')
  async savePost(
    @Body() likePostDTO: PostSavedReq
  ){
    return await this.postService.savedPostCreated(likePostDTO);
  };

  
@Post('/save/delete')
async deleteSavedPost(
  @Body() deleteSaveDTO: { userId: string; postId: string }
) {
  return await this.postService.deleteSavedPost(deleteSaveDTO);
}



  @Post('/create')
  @UseInterceptors(
    FilesInterceptor('image', 7, {
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          const destinationPath = `${cwd()}/uploads/tmp`;
  
          if (!existsSync(destinationPath)) {
            try {
              mkdirSync(destinationPath, { recursive: true }); // Ensure parent directories are created
            } catch (err) {
              return cb(err);
            }
          }
  
          cb(null, destinationPath);
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async createPost (
    @UploadedFiles() image: any,
    @Body() postDTO: PostCreateReq
  ) {

    const dbRes = await this.postService.createPostService({
      creator_id:postDTO.creator_id,
      caption:postDTO.caption,
      tags:postDTO.tags,
      location:postDTO.location,
    });


    if (image?.length) {
      renameSync(`${cwd()}/uploads/tmp`, `${cwd()}/uploads/${dbRes.post_id}`);
       let dbResFinal= this.postService.writeImagePathToDB({
        imageUrl:`http://localhost:3001/uploads/${dbRes.post_id}/${image[0].originalname}`,
        post_id:dbRes.post_id
      })
      return dbResFinal;
    }
  }
}
