import {
  Body,
  Get,
  Controller,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  TransactionDto,
  CreateTransactionDto,
  GetTransactionQueryDto,
} from './dto/transaction';
import { TransactionService } from './transaction.service';

@Controller()
@ApiTags('Transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Get Transactions' })
  @ApiOkResponse({
    description: 'Transactions',
    type: TransactionDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Transactions does not exist' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getTransactions(
    /**
     * В связи с ТЗ bankId использовать не буду
     */
    @Param('bankId', ParseUUIDPipe) bankId: string,
    @Query() query: GetTransactionQueryDto,
  ): Promise<Array<TransactionDto>> {
    const transactions = await this.transactionService.getTransactions(query);

    return transactions.map((transaction) => new TransactionDto(transaction));
  }

  @ApiOperation({ summary: 'Create new Transaction' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiCreatedResponse({
    description: 'Created Transaction',
    type: TransactionDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTransaction(
    @Param('bankId', ParseUUIDPipe) bankId: string,
    @Body() body: CreateTransactionDto,
  ): Promise<TransactionDto> {
    const transaction = await this.transactionService.createTransaction({
      ...body,
      bankId,
    });

    return new TransactionDto(transaction);
  }

  @ApiOperation({ summary: 'Get Transaction' })
  @ApiOkResponse({
    description: 'Transaction',
    type: TransactionDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Transaction does not exist' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getTransaction(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('bankId', ParseUUIDPipe) bankId: string,
  ) {
    const transaction = await this.transactionService.getTransaction({
      id,
      bankId,
    });

    return new TransactionDto(transaction);
  }

  @ApiOperation({ summary: 'Delete Transaction' })
  @ApiOkResponse({
    description: 'Transaction deleted',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteTransaction(
    @Param('bankId', ParseUUIDPipe) bankId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.transactionService.deleteTransaction({ id, bankId });
  }
}
