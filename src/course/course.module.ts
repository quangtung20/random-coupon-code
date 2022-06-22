import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './entities/course.schema';
import { Coupon, CouponSchema } from 'src/coupon/entities/coupon.schema';
import { User, UserSchema } from 'src/user/entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
