import { Injectable, HttpServer, HttpException, HttpStatus } from '@nestjs/common';
import { Address } from 'src/domain/models/valueObjects/user-address';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class BusinessDocumentValidator {
    private readonly apiUrl = 'https://receitaws.com.br/v1/cnpj/';

    async getCompanyInfo(cnpj: string): Promise<Address> {
        try {
            const response: AxiosResponse<any> = await axios.get(`${this.apiUrl}${cnpj}`);
            const data = response.data;

            if (data.status !== 'OK') 
                throw new HttpException('Failed to retrieve company info', HttpStatus.BAD_REQUEST);
            
            const address = new Address(data.logradouro, data.numero, data.municipio, data.bairro, data.uf, data.cep);

            return address
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
