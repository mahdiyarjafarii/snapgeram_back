import { Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller(
    {
        path: 'post',
        version: '1',
      }
)
export class PostController {
  constructor(private readonly appService: PostService) {}

  @Post('/create')
  getHello(): string {
    return this.appService.getHello();
  }
}
