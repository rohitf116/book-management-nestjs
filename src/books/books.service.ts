import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { Book } from './schema/book.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectConnection() private connection: Connection,
    private userService: UsersService,
  ) {}
  //
  async create(createBookDto: CreateBookDto, id: any) {
    await this.isTitleAlreadyUsed(createBookDto.title);
    await this.isIsbnAlreadyUsed(createBookDto.ISBN);

    createBookDto.userId = id;
    const book = await this.bookModel.create(createBookDto);
    return book;
  }

  findAll() {
    return `This action returns all books`;
  }

  async findUsersBooks(id: Types.ObjectId) {
    return;
  }

  findByTitle(title: string) {
    return this.bookModel.findOne({ title }).exec();
  }
  async isTitleAlreadyUsed(title: string) {
    const book = await this.findByTitle(title);
    if (book) {
      throw new ConflictException('title is not avalable');
    }
    return true;
  }

  async isIsbnAlreadyUsed(isbn: any) {
    const book = await this.bookModel.findOne({ ISBN: isbn });
    if (book) {
      throw new ConflictException('isbn is not avalable');
    }
    return true;
  }

  async findOne(id: any) {
    const book = await this.bookModel.findOne({ _id: id });

    return book;
  }
  checkOwner(bookId: any, userid: any) {
    if (userid !== bookId.userId.toString()) {
      throw new UnauthorizedException();
    }
    return true;
  }
  async findOneTest(id: any, userid: any) {
    const book = await this.bookModel.findOne({ _id: id });
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto, userId: any) {
    const book: Book = await this.bookModel.findOne({ _id: id });
    this.checkOwner(book, userId);
    return book;
  }

  async remove(id: string, userId: any) {
    const book: Book = await this.bookModel.findOne({ _id: id });
    this.checkOwner(book, userId);
    return `This action removes a #${id} book`;
  }
}
