import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Title } from '../enum/title.enum';
import { AddressDto } from '../dto/address.dto';
import * as bcrypt from 'bcrypt';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ enum: Title })
  title: string;
  @Prop()
  email: string;

  @Prop()
  phone: number;

  @Prop()
  password: string;

  @Prop({ default: 1 })
  tokenVersion: number;

  @Prop({ default: false })
  isAdmin: boolean;
  @Prop({
    type: AddressDto,
  })
  address: AddressDto;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.tokenVersion += 1;
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
