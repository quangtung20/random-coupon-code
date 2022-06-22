import { Module } from '@nestjs/common';
import { LotService } from './lot.service';
import { LotController } from './lot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lot, LotSchema } from './entities/lot.schema';
import { Coupon, CouponSchema } from 'src/coupon/entities/coupon.schema';
import { User, UserSchema } from 'src/user/entities/user.schema';
import { Course, CourseSchema } from 'src/course/entities/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lot.name, schema: LotSchema }]),
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])
  ],
  controllers: [LotController],
  providers: [LotService]
})
export class LotModule {}
