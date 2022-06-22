import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LotModule } from './lot/lot.module';
import { CourseModule } from './course/course.module';
import { CouponModule } from './coupon/coupon.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://quangtung:123456789xx@cluster0.wrlr9.mongodb.net/coupon?retryWrites=true&w=majority'),
    UserModule, CourseModule, LotModule, CouponModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
