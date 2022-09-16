import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @Min(0)
  price: number;
}
