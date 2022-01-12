import { IsEmail, IsNumber, IsString } from 'class-validator';

export class EditUserDTO {
  //Podemos deixar opcional uma vez que o id virá como parâmetro.
  @IsNumber()
  userId?: number;

  @IsString()
  name?: string;

  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  password?: string;
}

//SOLID - Princípio de boas práticas de programação.
//DTO - Design Pattern. aplica a letra O do Solid. Open Closed Principle
