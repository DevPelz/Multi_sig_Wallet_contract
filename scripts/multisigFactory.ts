import { ethers } from "hardhat";

    async function main() {
    const [Admin1, Admin2, Admin3, Admin4, spender] = await ethers.getSigners();
    const Owners = [Admin1.address, Admin2.address, Admin3.address, Admin4.address];

    let amount = ethers.parseEther("1");

    const multisigFactory = await ethers.deployContract('MultisigFactory', []);

    await multisigFactory.waitForDeployment();
    console.log(`======================================`);

    console.log(`MultisigFactory deployed to ${multisigFactory.target}`);
    console.log(`======================================`);

    let reciept = await multisigFactory.createMultisig(Owners, {value: ethers.parseEther("20")});
    //@ts-ignore
    let newMultisig = (await reciept.wait())?.logs[0];
    console.log(`======================================`);

//     let MultisigContract = await ethers.getContractAt("IMultisig", newMultisig);

// await MultisigContract.createTransaction(amount, spender.address);
// console.log(await MultisigContract.getTransaction(1));

 
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




// // console.log(await MultisigContract.getTransaction(1));








// // const [Admin1, Admin2, Admin3, Admin4, spender] = await ethers.getSigners();
// // const Owners = [Admin1.address, Admin2.address, Admin3.address, Admin4.address];

// // const multisigFactory = await ethers.deployContract('MultisigFactory', []);

// // let amount = ethers.parseEther("1");

// // await multisigFactory.waitForDeployment();
// // // console.log(`======================================`);

// // console.log(`MultisigFactory deployed to ${multisigFactory.target}`);
// // // console.log(`======================================`);

// // let reciept = await multisigFactory.createMultisig(Owners, {value: ethers.parseEther("20")});
// // //@ts-ignore
// // let newMultisig = console.log(await reciept.wait())?.logs[0]?.args[0];
// // // console.log(`======================================`);



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
