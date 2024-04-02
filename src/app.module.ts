import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './v1/auth/auth.module';
import { PostModule } from './v1/post/post.module';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PostModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
