import { expect } from "chai";
import { ethers as hardhatEthers } from "hardhat";

describe("BettingSystem", function () {
  async function deployContract() {
    const [owner, user1, user2, user3] = await hardhatEthers.getSigners();

    const BettingSystem = await hardhatEthers.getContractFactory("BettingSystem");
    const bettingSystem = await BettingSystem.deploy();

    return { bettingSystem, owner, user1, user2, user3 };
  }

  it("Deve permitir o depósito de fundos e atualizar o saldo do usuário", async function () {
    const { bettingSystem, user1 } = await deployContract();

    const depositAmount = hardhatEthers.parseEther("1");
    await expect(
      bettingSystem.connect(user1).deposit({ value: depositAmount })
    ).to.emit(bettingSystem, "Deposit").withArgs(user1.address, depositAmount);

    const balance = await bettingSystem.balances(user1.address);
    expect(balance).to.equal(depositAmount);
  });

  it("Deve impedir apostas sem saldo suficiente", async function () {
    const { bettingSystem, user1 } = await deployContract();

    const outcomes = ["Cara", "Coroa"];
    await bettingSystem.createEvent("Lançamento de Moeda", outcomes);

    const betAmount = hardhatEthers.parseEther("1");
    await expect(
      bettingSystem.connect(user1).placeBet(0, "Cara", { value: betAmount })
    ).to.be.revertedWith("Insufficient balance");
  });

  it("Deve atualizar dinamicamente as odds após cada aposta", async function () {
    const { bettingSystem, user1, user2 } = await deployContract();

    // Criar evento
    const outcomes = ["Cara", "Coroa"];
    await bettingSystem.createEvent("Lançamento de Moeda", outcomes);

    const depositAmount = hardhatEthers.parseEther("3");
    await bettingSystem.connect(user1).deposit({ value: depositAmount });
    await bettingSystem.connect(user2).deposit({ value: depositAmount });

    // Apostar
    const betAmount1 = hardhatEthers.parseEther("1"); // 1 ETH
    const betAmount2 = hardhatEthers.parseEther("2"); // 2 ETH

    const oddsInitialCara = await bettingSystem.getOdds(0, "Cara");
    const oddsInitialCoroa = await bettingSystem.getOdds(0, "Coroa");

    await bettingSystem.connect(user1).placeBet(0, "Cara", { value: betAmount1 });
    const oddsAfterFirstBetCara = await bettingSystem.getOdds(0, "Cara");
    const oddsAfterFirstBetCoroa = await bettingSystem.getOdds(0, "Coroa");

    expect(oddsAfterFirstBetCara).to.be.gt(0);
    expect(oddsAfterFirstBetCoroa).to.be.gt(0);

    // Apostar mais em outro resultado
    await bettingSystem.connect(user2).placeBet(0, "Coroa", { value: betAmount2 });
    const oddsAfterSecondBetCara = await bettingSystem.getOdds(0, "Cara");
    const oddsAfterSecondBetCoroa = await bettingSystem.getOdds(0, "Coroa");

    expect(oddsAfterSecondBetCara).to.be.greaterThanOrEqual(oddsAfterFirstBetCara);
    expect(oddsAfterSecondBetCoroa).to.be.lessThanOrEqual(oddsAfterFirstBetCoroa);
  });

  it("Deve permitir o saque do saldo acumulado após ganhar", async function () {
    const { bettingSystem, user1, user2 } = await deployContract();
  
    const depositAmount1 = hardhatEthers.parseEther("1");
    const depositAmount2 = hardhatEthers.parseEther("10");
  
    console.log("Iniciando depósitos...");
    await bettingSystem.connect(user1).deposit({ value: depositAmount1 });
    console.log(`Usuário 1 depositou: ${depositAmount1.toString()} wei`);
    await bettingSystem.connect(user2).deposit({ value: depositAmount2 });
    console.log(`Usuário 2 depositou: ${depositAmount2.toString()} wei`);
  
    const outcomes = ["Cara", "Coroa"];
    await bettingSystem.createEvent("Lançamento de Moeda", outcomes);
    console.log("Evento de aposta criado com resultados:", outcomes);
  
    await bettingSystem.connect(user1).placeBet(0, "Cara", { value: depositAmount1 });
    console.log(`Usuário 1 apostou em 'Cara' com ${depositAmount1.toString()} wei`);
    await bettingSystem.connect(user2).placeBet(0, "Coroa", { value: depositAmount2 });
    console.log(`Usuário 2 apostou em 'Coroa' com ${depositAmount2.toString()} wei`);
  
    await expect(bettingSystem.finalizeEvent(0, "Cara"))
      .to.emit(bettingSystem, "EventFinalized")
      .withArgs(0, "Cara");
    console.log("Evento finalizado com resultado: 'Cara'");
  
    const user1Balance = await bettingSystem.balances(user1.address);
    console.log(`Saldo acumulado do Usuário 1 no contrato: ${user1Balance.toString()} wei`);
    expect(user1Balance).to.equal(hardhatEthers.parseEther("6"));
  
    const initialBalance = await hardhatEthers.provider.getBalance(user1.address);
    console.log(`Saldo inicial do Usuário 1: ${initialBalance.toString()} wei`);
  
    const tx = await bettingSystem.connect(user1).withdraw();
    console.log("Usuário 1 executou a função withdraw()...");
    const receipt = await tx.wait();
  
    if (receipt) {
      const gasUsed = receipt.gasUsed;
      console.log(`Gás usado na transação: ${gasUsed.toString()} unidades`);
  
      const effectiveGasPrice = tx.gasPrice; // Compatibilidade com versões antigas
      console.log(`Preço efetivo do gás: ${effectiveGasPrice.toString()} wei`);
  
      const gasCost = gasUsed * (effectiveGasPrice);
      console.log(`Custo total do gás: ${gasCost.toString()} wei`);
  
      const finalBalance = await hardhatEthers.provider.getBalance(user1.address);
      console.log(`Saldo final do Usuário 1: ${finalBalance.toString()} wei`);
  
      // Validação do saldo
      expect(finalBalance + (gasCost)).to.equal(initialBalance + (user1Balance));
    }
  });
  
  

  it("Deve manter o histórico de eventos finalizados", async function () {
    const { bettingSystem, user1 } = await deployContract();

    const depositAmount = hardhatEthers.parseEther("1");
    await bettingSystem.connect(user1).deposit({ value: depositAmount });

    const outcomes = ["Cara", "Coroa"];
    await bettingSystem.createEvent("Lançamento de Moeda", outcomes);

    await bettingSystem.connect(user1).placeBet(0, "Cara", { value: depositAmount });
    await bettingSystem.finalizeEvent(0, "Cara");

    const finalizedEvent = await bettingSystem.finalizedEvents(0);
    expect(finalizedEvent.name).to.equal("Lançamento de Moeda");
    expect(finalizedEvent.result).to.equal("Cara");
    expect(finalizedEvent.totalPool).to.equal(hardhatEthers.parseEther("5"));
  });

  it("Deve falhar ao finalizar evento com resultado inválido", async function () {
    const { bettingSystem } = await deployContract();

    const outcomes = ["Cara", "Coroa"];
    await bettingSystem.createEvent("Lançamento de Moeda", outcomes);

    await expect(bettingSystem.finalizeEvent(0, "Invalido")).to.be.revertedWith("Invalid result");
  });

});
