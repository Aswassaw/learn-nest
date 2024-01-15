import { Injectable } from '@nestjs/common';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroService {
  private readonly heroes: Hero[] = [];

  getHello(): string {
    return 'Hello World!';
  }
}
