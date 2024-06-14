import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString({ message: 'Invalid password' })
  @MinLength(8, { message: 'The password must contain at least 8 characters' })
  password: string;

  name: string;
}
