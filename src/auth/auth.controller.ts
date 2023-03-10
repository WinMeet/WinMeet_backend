import { Body } from "@nestjs/common";
import { Controller, Post, Req } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    
    @Post('signup')
    signup(@Body() dto:AuthDto){
        console.log({
            dto,
        })
        return this.authService.signup(dto)
    }

    @Post('login')
    login(){
        return this.authService.login()
    }
}