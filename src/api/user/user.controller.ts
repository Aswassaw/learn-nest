import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }

  @Get(':id')
  async profile(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    if (
      !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/.test(
        id,
      )
    ) {
      return res.json({
        error: 'UUID Not Valid',
      });
    }

    const data = await this.userService.profile(id);
    return data;
  }
}
