import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class GetProductDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(1)
  @IsOptional()
  name?: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;
}
