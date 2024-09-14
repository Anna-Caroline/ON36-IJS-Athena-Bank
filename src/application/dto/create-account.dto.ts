import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '../../domain/enum/account-type.enum';
import { Address } from '../../domain/models/valueObjects/user-address';

export class CreateAccountDto {
    @ApiProperty({ enum: AccountType, enumName: 'AccountType' })
    accountType: AccountType;

    @ApiProperty({ description: 'Document of the account holder (e.g., CPF for individual, CNPJ for business)' })
    holderDocument?: string;

    @ApiProperty({ description: 'Document of the business (CNPJ)', required: false })
    businessDocument?: string;

    @ApiProperty({ description: 'Address of the business', required: false })
    businessAddress?: Address;

    @ApiProperty({ description: 'Industry of the business', required: false })
    industry?: string;
}
