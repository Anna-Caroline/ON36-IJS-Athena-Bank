// src/dto/create-transaction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOperationDto {
    @IsNumber()
    @ApiProperty()
    amount: number;

    @IsString()
    @ApiProperty()
    receiver: string;

    @IsString()
    @ApiProperty()
    receiverAccount: string;

    @IsString()
    @ApiProperty()
    debtor: string;

    @IsString()
    @ApiProperty()
    debtorAccount: string;

    @IsString()
    @ApiProperty()
    description: string;
}
