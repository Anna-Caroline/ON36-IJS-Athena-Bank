import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../../domain/models/valueObjects/user-address';

export class CreateUserDto {
    @ApiProperty({ example: 'Luana Lessa' })
    name: string;

    @ApiProperty({ example: '12345678901' })
    idNumber: string;

    @ApiProperty()
    address: Address;

    @ApiProperty({ example: '123-456-7890' })
    phone: string;

    @ApiProperty({ example: '1997-06-09' })
    dateOfBirth: Date;

    @ApiProperty({ example: 'lessalsn@example.com' })
    email: string;

    @ApiProperty({ example: 'strongpassword' })
    password: string;
}
