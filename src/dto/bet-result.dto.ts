import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class BetResultDto {
  @ApiProperty({ example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000' })
  @IsNotEmpty()
  @IsUUID()
  transactionId: string;

  @ApiProperty({ example: 'player1' })
  @IsNotEmpty()
  playerId: string;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  @ApiProperty({ example: 'galdgljgsagkhakahsgkgakhgkhgsakhasgkhlglh' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ example: 50 })
  @IsNotEmpty()
  @IsNumber()
  wonAmount: number;
}
