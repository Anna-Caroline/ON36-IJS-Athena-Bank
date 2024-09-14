import { IsEnum, IsString } from 'class-validator';
import { AccountType } from '../../domain/enum/account-type.enum';

export class GetAccountDto {
    @IsString()
    accountNumber: string;

    @IsEnum(AccountType)
    accountType: AccountType;
}
