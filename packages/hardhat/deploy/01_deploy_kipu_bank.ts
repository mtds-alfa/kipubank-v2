import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Configuration for KipuBankV2
  // Bank cap: $1,000,000 (in USD with 8 decimals)
  const BANK_CAP_USD = 100_000_000_000_000; // $1M with 8 decimals
  // Withdrawal limit: $10,000 per transaction (in USD with 8 decimals)
  const WITHDRAWAL_LIMIT_USD = 1_000_000_000; // $10K with 8 decimals

  console.log("Deploying KipuBankV2 with the following parameters:");
  console.log(`- Bank Cap: $${BANK_CAP_USD / 10 ** 8} USD`);
  console.log(`- Withdrawal Limit: $${WITHDRAWAL_LIMIT_USD / 10 ** 8} USD per transaction`);
  console.log(`- Deployer: ${deployer}`);

  await deploy("KipuBankV2", {
    from: deployer,
    args: [deployer, BANK_CAP_USD, WITHDRAWAL_LIMIT_USD],
    log: true,
    autoMine: true,
  });

  const kipuBank = await hre.ethers.getContract("KipuBankV2", deployer);
  console.log("\nKipuBankV2 deployed to:", await kipuBank.getAddress());
  console.log("Bank Owner:", await kipuBank.owner());
  console.log("Bank Cap:", (await kipuBank.BANK_CAP_USD()).toString(), "(in USD with 8 decimals)");
  console.log("Withdrawal Limit:", (await kipuBank.WITHDRAWAL_LIMIT_USD()).toString(), "(in USD with 8 decimals)");
};

export default func;
func.tags = ["KipuBankV2"];
