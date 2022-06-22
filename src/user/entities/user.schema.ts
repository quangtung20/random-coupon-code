import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({collection:'user'})
export class User {
  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);