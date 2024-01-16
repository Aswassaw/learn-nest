import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async register(dto: CreateUserDto) {
    const passwordHashed = await this.bcryptService.hashPassword(dto.password);

    const userExist = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (userExist) {
      throw new ConflictException('Email already exist!');
    }

    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: passwordHashed,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }

  async profile(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Data user not found bro');
    }

    return user;
  }
}
