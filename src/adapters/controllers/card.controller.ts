// src/infrastructure/controllers/card.controller.ts
import { Body, Controller, Delete, Get, Post, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreditCardUseCases } from '../../application/usecases/credit-card.usecase';
import { CreateCreditCardDto } from '../../application/dto/create-card.dto';
import { CreatePurchaseDto } from '../../application/dto/create-purchase.dto';

@ApiTags('Credit Card')
@Controller('credit-card')
export class CardController {
    constructor(private readonly creditCardUseCases: CreditCardUseCases) {}

    @Post('')
    async create(@Query() createCreditCardDto: CreateCreditCardDto) {
        try {
            const card = await this.creditCardUseCases.createCreditCard(createCreditCardDto);
            return { statusCode: HttpStatus.CREATED, message: 'Credit Card created successfully', data: { card } };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('purchase')
    @ApiBody({ type: CreatePurchaseDto })
    async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
        try {
            await this.creditCardUseCases.createPurchase(createPurchaseDto);
            return { statusCode: HttpStatus.OK, message: 'Purchase processed successfully' };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('invoice/:cardId')
    @ApiQuery({ name: 'month', type: Number, description: 'Month of the invoice (1-12)' })
    @ApiQuery({ name: 'year', type: Number, description: 'Year of the invoice' })
    async getInvoice(@Param('cardId') cardId: string, @Query('month') month: number, @Query('year') year: number) {
        try {
            const invoice = await this.creditCardUseCases.getInvoice(cardId, month, year);
            return { statusCode: HttpStatus.OK, message: 'Invoice retrieved successfully', data: { invoice } };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
