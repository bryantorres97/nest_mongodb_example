import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ type: String, required: true })
  name: string;
  @ApiProperty({ type: Number, required: true })
  price: number;
}
