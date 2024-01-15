import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsBoolean()
  @IsNotEmpty()
  isMarried: boolean;
}
