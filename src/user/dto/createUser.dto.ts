import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

//SOLID - Princípio de boas práticas de programação.
//DTO - Design Pattern. aplica a letra O do Solid. Open Closed Principle
