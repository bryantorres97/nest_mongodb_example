import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ type: String, required: true })
  name: string;
  @ApiProperty({ type: Number, required: true })
  price: number;
}
