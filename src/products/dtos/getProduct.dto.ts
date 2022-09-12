import { ApiProperty } from '@nestjs/swagger';

export class GetProductDto {
  @ApiProperty({ type: String })
  _id: string;
  @ApiProperty({ type: String })
  name?: string;
  @ApiProperty({ type: Number })
  price?: number;
}
