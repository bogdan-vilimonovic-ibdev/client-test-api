import { WalletOperation } from '../enums/wallet-operation.enum';

export class TransactionDto {
  id: string;

  playerId: string;

  brandId: number;

  token: string;

  walletOperation: WalletOperation;

  amount: number;
}
