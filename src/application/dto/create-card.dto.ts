import { ApiProperty } from '@nestjs/swagger';
import { Acquirer } from '../../domain/enum/acquirer.enum';

export class CreateCreditCardDto {
    @ApiProperty({ example: 'John Doe' })
    cardHolderName: string;

    @ApiProperty({ example: '1234' })
    password: string;

    @ApiProperty({ example: 'VISA', enum: Acquirer })
    brand: Acquirer;

    @ApiProperty({ example: 15 })
    invoiceDay: number;

    @ApiProperty({ example: 114 })
    account: string;
}
