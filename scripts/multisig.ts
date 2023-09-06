import { ethers } from "hardhat";

async function main() {
    const [Admin1, Admin2, Admin3, Admin4] = await ethers.getSigners();
    const Owners = [Admin1.address, Admin2.address, Admin3.address, Admin4.address];
    const multisig = await ethers.deployContract('Multisig', [Owners],{
        value: ethers.parseEther('10')
    });

    await multisig.waitForDeployment();

    const amount = ethers.formatEther('5');

    multisig.createTransaction



}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
