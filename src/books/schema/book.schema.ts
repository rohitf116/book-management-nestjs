import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ unique: true })
  title: string;

  @Prop()
  excerpt: string;

  @Prop({ type: SchemaTypes.ObjectId })
  userId: string;

  @Prop({ unique: true })
  ISBN: number;

  @Prop()
  category: string;

  @Prop()
  subcategory: string[];

  @Prop({ default: 0 })
  reviews: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  releasedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
