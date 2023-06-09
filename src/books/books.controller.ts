import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetUser } from 'src/users/decorators/get-current-user.decorator';
import { BookGuard } from 'src/guards/book.guard';
import { Owner } from 'src/interceptor/owner.interceptor';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto, @GetUser() id: any) {
    return this.booksService.create(createBookDto, id);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }
  //fds
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() userId: any) {
    return this.booksService.findOneTest(id, userId);
  }

  @Patch(':id')
  // @UseGuards(BookGuard)
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @GetUser() userId: any,
  ) {
    return this.booksService.update(id, updateBookDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() userId: any) {
    return this.booksService.remove(id, userId);
  }
}
