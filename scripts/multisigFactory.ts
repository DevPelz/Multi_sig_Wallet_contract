import { ethers } from "hardhat";

async function main() {
    const [Admin1, Admin2, Admin3, Admin4, spender] = await ethers.getSigners();
    const Owners = [Admin1.address, Admin2.address, Admin3.address, Admin4.address];
    const multisigFactory = await ethers.deployContract('MultisigFactory', []);

    await multisigFactory.waitForDeployment();
    console.log(`======================================`);

    console.log(`MultisigFactory deployed to ${multisigFactory.target}`);
    console.log(`======================================`);

    let reciept = await multisigFactory.createMultisig(Owners, {value: ethers.parseEther("20")});
    //@ts-ignore
    console.log((await reciept.wait())?.logs[0]);
    console.log(`======================================`);
 
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
