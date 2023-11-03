import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IUserService } from 'src/factory/user-factory.service';

@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private userService: IUserService) {}
  @Get()
  getUsers(): Observable<any> {
    return this.userService
      .getUsers()
      .pipe(
        catchError((err) =>
          throwError(
            () =>
              new HttpException('Error fetching data', HttpStatus.BAD_GATEWAY),
          ),
        ),
      );
  }

  @Get(':id')
  getDataById(@Param('id') id: string): Observable<any> {
    return this.userService
      .getUserById(id)
      .pipe(
        catchError((error) =>
          throwError(
            () => new HttpException(error.message, HttpStatus.BAD_GATEWAY),
          ),
        ),
      );
  }
}
