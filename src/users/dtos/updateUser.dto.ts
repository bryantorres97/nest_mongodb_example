import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the User',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  name: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;
}
