import { ethers, network } from 'hardhat'

async function main() {
  const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
  const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  const path = [UNI, DAI]
  const to = '0xd8500DA651A2e472AD870cDf76B5756F9c113257'
  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const deadline = currentTimestampInSeconds + 86400
  const UNIHOLDER = '0x47173B170C64d16393a52e6C480b3Ad8c302ba1e'

  const uniswap = await ethers.getContractAt('IUniswap', uniswapAddr)
  const uniContract = await ethers.getContractAt('IERC20', UNI)
  const DAIContract = await ethers.getContractAt('IERC20', DAI)

  const AmountOut = ethers.parseEther('1')
  const AmountinMax = ethers.parseEther('5')

  await network.provider.send('hardhat_setBalance', [
    UNIHOLDER,
    '0x91A76D5E7CC6F7DEE000',
  ])

  const UNISigner = await ethers.getImpersonatedSigner(UNIHOLDER)
  await uniContract.connect(UNISigner).approve(uniswapAddr, AmountinMax)
  console.log(await DAIContract.balanceOf(to))

  await uniswap
    .connect(UNISigner)
    .swapTokensForExactTokens(AmountOut, AmountinMax, path, to, deadline)
  console.log(await DAIContract.balanceOf(to))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})