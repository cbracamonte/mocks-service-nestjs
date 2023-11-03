import { Module, Scope } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { ConfigModule} from '@nestjs/config';
import { HttpModule} from '@nestjs/axios';
import { UserFactoryService } from './factory/user-factory.service';


@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserFactoryService,
      // singleton enable
      scope: Scope.DEFAULT
    }
  ],

})
export class AppModule { }
