import { ethers } from "hardhat";


async function main() {
    
    let [spender, admin1, admin2] = await ethers.getSigners();
    let amount = ethers.parseEther("1");
    const CA = "0x3c68027368aC1938926f1716AfFAC8A95dDa6267";
    
    let factory = await ethers.getContractAt("IMultisigs", CA);
    let reciepts =  await factory.createMultisig([
        "0x764693DD666E8dD9275CDE8F05C6B07446B1d941",
        "0xC97Ca6Bb5cB925b168E4b75023cf69B7a8D008AA",
        "0xa7CE10aef4171Ecf82E77Ddf8fb148f25B73DCEA",
    ], {value: amount});

    //@ts-ignore
//    let newMultisig =  (await reciepts.wait())?.logs[0].args[0];
//    console.log(newMultisig);
    
    await network.provider.send("hardhat_setBalance", [
  "0xa7CE10aef4171Ecf82E77Ddf8fb148f25B73DCEA",
  "0x56BC75E2D63100000",
]);

    const spender1 = await ethers.getImpersonatedSigner("0xa7CE10aef4171Ecf82E77Ddf8fb148f25B73DCEA");
    const multiSig = await ethers.getContractAt("IMultisig", "0xEc8a70405EE67BA65dD9c2C3449446a407a24172");
    // await spender1.sendTransaction({to: "0xEc8a70405EE67BA65dD9c2C3449446a407a24172", value: ethers.parseEther("1") });
    // console.log(await multiSig.getTransaction(2));
// console.log(await ethers.provider.getBalance("0xEc8a70405EE67BA65dD9c2C3449446a407a24172"));

    // await multiSig.connect(spender1).createTransaction(
    //     amount,
    //     spender1
    // );
    const approved = await multiSig.connect(spender1).AprroveTransaction(2);
    console.log(await ethers.provider.getBalance("0xEc8a70405EE67BA65dD9c2C3449446a407a24172"))
//     console.log(`Transaction ${approved} has been approved successfully`)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});