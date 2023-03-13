import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import KcAdminClient from '@keycloak/keycloak-admin-client';

const adminClient = new KcAdminClient({
  baseUrl: 'http://localhost:8080/auth',
  realmName: 'test'
})

let execute = async function () {
  await adminClient.auth({
    username: 'emre',
    password: 'emre',
    grantType: 'password',
    clientId: 'nodejs-admin-client'
  })
  const users = await adminClient.users.find();
  console.log(users)
}
//test
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
  }))
  await app.listen(3000);
}
bootstrap();
