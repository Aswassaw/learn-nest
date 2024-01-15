import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateHeroDto } from './dto/create-hero.dto';

@Controller('hero')
export class HeroController {
  @Get('/')
  index(@Res() res: Response) {
    return res.json({
      code: 200,
      message: 'Halaman Hero Index',
    });
  }

  @Post('/')
  create(@Body() body: CreateHeroDto, @Res() res: Response) {
    return res.json({
      code: 201,
      message: 'Halaman Hero Create',
      data: body,
    });
  }

  @Put('/:id')
  update(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateHeroDto,
    @Param('id') param: { id: string },
  ) {
    // console.log(req.body);
    // console.log(req.headers.authorization);
    // console.log(req.query.manusia);
    console.log(body.name);
    console.log(param);

    return res.json({
      code: 200,
      message: 'Halaman Hero Update',
      data: req.body,
      id: req.params.id,
    });
  }
}
