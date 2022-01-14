import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validate(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      //... spread Operator
      // Destructuring Assignment
      const { password, ...result } = user;

      // demais validações... ex: É um administrador? Está bloqueado?

      return user;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Usuário inexistente ou senha inválida',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async login(user: any) {
    const payload = { email: user.email, name: user.name, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
