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
  Put,
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
import { BankDto, CreateBankDto, UpdateBankDto } from './dto/bank';
import { BankService } from './bank.service';

@Controller()
@ApiTags('Bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @ApiOperation({ summary: 'Get Banks' })
  @ApiOkResponse({
    description: 'Banks',
    type: BankDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Banks does not exist' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getBanks(): Promise<Array<BankDto>> {
    const banks = await this.bankService.getBanks();

    return banks.map((bank) => new BankDto(bank));
  }

  @ApiOperation({ summary: 'Create new Bank' })
  @ApiBody({ type: CreateBankDto })
  @ApiCreatedResponse({
    description: 'Created Bank',
    type: BankDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createBank(@Body() body: CreateBankDto): Promise<BankDto> {
    const bank = await this.bankService.createBank(body);

    return new BankDto(bank);
  }

  @ApiOperation({ summary: 'Get Bank' })
  @ApiOkResponse({
    description: 'Bank',
    type: BankDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Bank does not exist' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getBank(@Param('id', ParseUUIDPipe) id: string) {
    const bank = await this.bankService.getBank({
      id,
    });

    return new BankDto(bank);
  }

  @ApiOperation({ summary: 'Delete Bank' })
  @ApiOkResponse({
    description: 'Bank deleted',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteBank(@Param('id', ParseUUIDPipe) id: string) {
    await this.bankService.deleteBank({ id });
  }

  @ApiOperation({ summary: 'Update Bank' })
  @ApiBody({ type: UpdateBankDto })
  @ApiOkResponse({
    description: 'Bank updated',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async updateBank(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateBankDto,
  ) {
    await this.bankService.updateBank({ id, ...body });
  }
}
