import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { IUserService } from 'src/factory/user-factory.service';

@Injectable()
export class UserMockServerService implements IUserService {

  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
  }
  apiUserUrl = `${this.configService.get<string>('URL_BASE')}users`;
  getUsers(): Observable<any> {
    return this.httpService.get(this.apiUserUrl).pipe(
      map(response => response.data)
    );
  }

  getUserById(id: string): Observable<any> {
    return this.httpService.get(`${this.apiUserUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
