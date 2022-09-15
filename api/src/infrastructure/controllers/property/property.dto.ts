import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}

export class UpdatePropertyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}
