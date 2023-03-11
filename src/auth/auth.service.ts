import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'http://localhost:8080', // might be http://localhost:8080/auth for older keycloak versions
      realm: 'master',
      clientId: 'my-nestjs-app',
      secret: 'secret',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  } 
}

@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService){}
    async signup(dto: AuthDto){
        //generate password
        const hash = await argon.hash(dto.password);
        //save user to db
        const user = await this.prisma.user.create({
            data:{
                email:dto.email,
                hash,
            }
        })
        //return the saved user
        return user;
        //return {msg: 'I have signed up'};
    }

    login(){
        return {msg: 'I have logged in'};
    }
}

