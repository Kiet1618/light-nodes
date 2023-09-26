import { Body, Controller, Get, Post, UseGuards, UseInterceptors, Param } from "@nestjs/common";
import { LookupWalletDto } from "src/dtos/lookup-wallet.dto";
import { GRPCService } from "src/grpc/grpc-service";
import { Wallet } from "src/schemas";
import { WalletService } from "src/services";
import { VerifyGuard } from "src/verifier/verify.guard";

@Controller("wallets")
export class WalletController {
  constructor(private readonly walletService: WalletService, private grpcService: GRPCService) { }

  @Post()
  async lookupWallet(@Body() lookupWalletDto: LookupWalletDto): Promise<any> {
    const existedWallet = await this.walletService.findWallet(lookupWalletDto.owner);
    if (existedWallet) {
      return existedWallet;
    }

    const { publicKey, address, addressETH } = await this.grpcService.generateSharedSecret(
      lookupWalletDto.owner,
    );
    return this.walletService.createWallet(lookupWalletDto.owner, publicKey, address, addressETH);
  }

  @Get()
  async findAll(): Promise<Wallet[]> {
    return this.walletService.findAll();
  }

  @Get(":owner")
  // @UseGuards(VerifyGuard)
  async findWallet(@Param("owner") owner: string): Promise<Wallet> {
    return this.walletService.findWallet(owner);
  }

}
