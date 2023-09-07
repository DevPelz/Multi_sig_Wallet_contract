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
    //@ts-ignore
    console.log((await reciept.wait())?.logs.args);

    await multisig.connect(Admin3).ApproveTransaction(1);
    let balanceBefore = await ethers.provider.getBalance(spender.address);

    console.log(`Balance Before ${ethers.formatEther(balanceBefore)}`);
    console.log(`======================================`); 

    await multisig.connect(Admin2).ApproveTransaction(1);
    console.log(`Spender Balance ${ethers.formatEther((await ethers.provider.getBalance(spender.address))- balanceBefore)}`);
    console.log(`======================================`); 

    console.log(`Multisig balance before: ${ethers.formatEther(await ethers.provider.getBalance(multisig))}`);
    console.log(`======================================`); 

    const transact = await spender.sendTransaction({from: spender.address, to: multisig.target, value: ethers.parseEther("1")});
    console.log( await transact.wait());
    console.log(`======================================`); 

    console.log(`Multisig balance After: ${ethers.formatEther(await ethers.provider.getBalance(multisig))}`);
    console.log(`======================================`); 
    // console.log(`sent ${sent} ether to ${multisig.target}`);
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
