// src/dto/create-transaction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTransferDto {
    @IsNumber()
    @ApiProperty()
    amount: number;

    @IsString()
    @ApiProperty()
    senderId: string;

    @IsString()
    @ApiProperty()
    senderAccountNumber: string;

    @IsString()
    @ApiProperty()
    receiverId: string;

    @IsString()
    @ApiProperty()
    receiverAccountNumber: string;

    @IsString()
    @ApiProperty()
    description: string;
}
