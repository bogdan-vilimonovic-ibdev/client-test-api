import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiService } from './api/api.service';
import { PlaceBetDto } from './dto/place-bet.dto';
import { BetResultDto } from './dto/bet-result.dto';
import { TransactionDto } from './dto/transaction.dto';
import { WalletOperation } from './enums/wallet-operation.enum';

const testUser = {
  id: '123',
  username: 'RistaGlista',
  balance: 1000,
  currency: 'eur',
  country: 'UK',
};

@Controller()
export class AppController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/open-game/plinko')
  async getHello(): Promise<object> {
    const getGameResponse = await this.apiService.post(
      'http://localhost:3000/integration/open-game/plinko',
      '',
      {
        playerId: testUser.id,
        brandId: 5,
        token: '123456',
        homeUrl: 'http://127.0.0.1:5500/client-test-api/index.html',
        language: 'en',
        ip: '123.1.1.1',
        walletUrl: 'http://127.0.0.1:5500/client-test-api/index.html',
        currency: testUser.currency,
        country: testUser.country,
        balance: testUser.balance,
      },
    );

    return getGameResponse;
  }

  @Post('/bet/place')
  async placeBetWebhookRoute(
    @Body() placeBetDto: PlaceBetDto,
  ): Promise<object> {
    const { playerId, brandId, token, betAmount } = placeBetDto;

    if (betAmount > testUser.balance) {
      return {
        error: 400,
      };
    }

    testUser.balance -= betAmount;
    console.log(testUser);

    const playerBalance = {
      playerId,
      brandId,
      token,
      balance: testUser.balance,
    };

    return playerBalance;
  }

  @Post('/bet/result')
  async betResultWebhookRoute(
    @Body() betResultDto: BetResultDto,
  ): Promise<object> {
    const { playerId, brandId, token, wonAmount } = betResultDto;

    testUser.balance += wonAmount;
    console.log(testUser);

    const playerBalance = {
      playerId,
      brandId,
      token,
      balance: testUser.balance,
    };

    return playerBalance;
  }

  @Post('/transaction/rollback')
  async transactionRollback(@Body() transaction: TransactionDto) {
    if (transaction.walletOperation === WalletOperation.DEPOSIT) {
      testUser.balance -= transaction.amount;
    }

    if (transaction.walletOperation === WalletOperation.WITHDRAW) {
      testUser.balance += transaction.amount;
    }
  }
}
