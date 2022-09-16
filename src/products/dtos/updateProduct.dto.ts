import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  price: number;
}
