import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const userSelected = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!userSelected) {
      throw new NotFoundException('Data user not found bro');
    }

    const isPasswordValid = await this.bcryptService.comparePassword(
      dto.password,
      userSelected.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password salah bro');
    }

    return {
      ...userSelected,
      accessToken: this.jwtService.sign(
        { id: userSelected.id },
        {
          secret: 'aswassawsecret',
          expiresIn: '2000',
        },
      ),
    };
  }
}
