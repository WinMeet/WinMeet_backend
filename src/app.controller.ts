import { Controller, Get } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller()
export class AppController {
constructor(private readonly userService: AppService) {}@Get('/public')

@Unprotected()
getpublic(): string {
return `${this.userService.getHello()} from public`;
}

@Get('/user')
@Roles({ roles: ['admin', 'other'] })
getUser(): string {
return `${this.userService.getHello()} from user`;
}

@Get('/admin')
@Roles({ roles: ['admin', 'realm:sysadmin'], mode: RoleMatchingMode.ALL })
getAdmin(): string {
return `${this.userService.getHello()} from admin`;
}

@Get('/all')
@Roles({ roles: [], mode: RoleMatchingMode.ALL })
getAll(): string {
return `${this.userService.getHello()} from all`;
}
@Get()
getHello(): string {
  return this.userService.getHello();
}
}
/*@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}*/
