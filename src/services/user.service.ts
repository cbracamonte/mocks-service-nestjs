import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { IUserService } from 'src/factory/user-factory.service';

@Injectable()
export class UserService implements IUserService {

  private readonly urlBase: string;
  constructor(private readonly configService: ConfigService) {
    this.urlBase = this.configService.get<string>('URL_BASE');
  }
  
  private readonly users = [
    {
      id: '1',
      name: 'John',

    },
    {
      id: '2',
      name: 'Jane',
    },
    {
      id: '3',
      name: 'Mark',
    }
  ]

  getUsers(): Observable<any> {
    return of(this.users);
  }
  getUserById(id: string): Observable<any> {
    const findUser = this.users.find(user => user.id === id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return of(findUser);
  }
}