import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Course } from 'src/course/entities/course.schema';
import { Lot } from 'src/lot/entities/lot.schema';
import { User } from 'src/user/entities/user.schema';

export type CouponDocument = Coupon & Document;

@Schema()
export class Coupon {
  @Prop({ type:String})
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Lot.name })
  lot: Lot;

  @Prop({type:String,default:'not used'})
  status: string;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);