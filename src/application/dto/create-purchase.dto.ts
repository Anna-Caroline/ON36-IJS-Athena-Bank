import { ApiProperty } from '@nestjs/swagger';
import { CreditCardPaymentType } from '../../domain/enum/purchase-type.enum';
import { CreateOperationDto } from 'src/application/dto/create-operation.dto';
import { IsEnum, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreatePurchaseDto {
    @ApiProperty({ example: '4111111111111111', description: 'Credit card number' })
    @IsString()
    @Length(16, 16)
    cardNumber: string;

    @ApiProperty({ example: '123432432', description: 'Password for the card' })
    @IsString()
    password: string;

    @ApiProperty({ example: '123', description: 'Security code of the card' })
    @IsString()
    @Length(3, 3)
    securityCode: string;

    @ApiProperty({ example: 3, description: 'Number of installments for the purchase' })
    @IsNumber()
    @Min(1)
    installments: number;

    @ApiProperty({ description: 'Details of the operation' })
    details: CreateOperationDto;
}
