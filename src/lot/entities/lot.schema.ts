import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Coupon } from 'src/coupon/entities/coupon.schema';
import { Course } from 'src/course/entities/course.schema';
import { User } from 'src/user/entities/user.schema';

export type LotDocument = Lot & Document;

@Schema()
export class Lot {
  @Prop()
  name: string;

  @Prop({type:Date,default: Date.now})
  createTime:Date;

  @Prop({type:Date})
  expireTime:Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type:String})
  note: string;

  @Prop({type:Number})
  amount:number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Course.name }] })
  courses: Course[];

  @Prop({ type:Number})
  availableDay:number;
}

export const LotSchema = SchemaFactory.createForClass(Lot);