import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Obtendo o saldo da conta corretamente
  const balance = await deployer.provider!.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Fazendo deploy do contrato
  const ContractFactory = await ethers.getContractFactory("BettingSystem");
  const contract = await ContractFactory.deploy();

  // Aguarde o deploy ser concluído
  
  (await contract as any).deployed();
  console.log("Contract deployed to:", (contract as any).address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
