import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BooksService } from 'src/books/books.service';

export class BookGuard implements CanActivate {
  constructor(private booksService: BooksService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(this.booksService);
    const book = await this.booksService.findOne(user._id);

    // Additional logic to handle authorization based on the retrieved book
    if (!book) {
      throw new UnauthorizedException();
    }
    console.log(book);
    // You can add more authorization checks based on the retrieved book if needed

    return true;
  }
}
