import { ethers } from "hardhat";

async function main() {
    const [Admin1, Admin2, Admin3, Admin4, spender] = await ethers.getSigners();
    const Owners = [Admin1.address, Admin2.address, Admin3.address, Admin4.address];
    const multisig = await ethers.deployContract('Multisig', [Owners],{
        value: ethers.parseEther('10')
    });

    const amount = ethers.parseEther('5');
    await multisig.waitForDeployment();
    console.log(`Multisig deployed to ${multisig.target}`);
    console.log(`======================================`);

    const reciept = await multisig.createTransaction(amount, spender.address);
    console.log((await reciept.wait())?.logs);

    
    await multisig.connect(Admin3).ApproveTransaction(1);
    let balanceBefore = await ethers.provider.getBalance(spender.address);
    console.log(`Balance Before ${balanceBefore}`);
    console.log(`======================================`); 
    await multisig.connect(Admin1).ApproveTransaction(1);
    console.log(`Spender Balance ${ethers.formatEther((await ethers.provider.getBalance(spender.address)) - balanceBefore)}`)




}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
