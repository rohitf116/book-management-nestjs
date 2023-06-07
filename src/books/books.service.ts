import { ConflictException, Injectable, UseGuards } from '@nestjs/common';
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
    await this.userService.notExistingUser(id);
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
    await this.userService.notExistingUser(id);
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

  async isIsbnAlreadyUsed(isbn) {
    const book = await this.bookModel.findOne({ ISBN: isbn });
    if (book) {
      throw new ConflictException('isbn is not avalable');
    }
    return true;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookModel.find({ _id: id });
    console.log(book);
    return book;
  }

  async remove(id: number) {
    await this.userService.notExistingUser(id);
    return `This action removes a #${id} book`;
  }
}
