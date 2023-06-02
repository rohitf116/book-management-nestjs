import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Title } from '../enum/title.enum';

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

  @Prop({
    type: {
      street: String,
      city: String,
      pinCode: String,
    },
  })
  address: {
    street: string;
    city: string;
    pinCode: number;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
