import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../services/user.service';
import { UserMockServerService } from '../services/user-mock-server.service';
import { Observable } from 'rxjs';


export interface IUserService {
    getUsers(): Observable<any>;
    getUserById(id:string): Observable<any>;
}


@Injectable()
export class UserFactoryService implements IUserService {
  private userService: IUserService;

  constructor(private configService: ConfigService, private httpService: HttpService) {
    const environmentConfig = {
      urlBase: this.configService.get<string>('URL_BASE'),
      activeMocksServices: this.configService.get<string>('ACTIVE_MOCKS_SERVICES') === 'true'
    };
    this.userService = !environmentConfig.activeMocksServices
      ? new UserService(this.configService)
      : new UserMockServerService(this.configService, this.httpService);
  }
    getUsers(): Observable<any> {
        return this.userService.getUsers();
    }
    getUserById(id: string): Observable<any> {
        return this.userService.getUserById(id);
    }
}