import { ethers, network } from 'hardhat'

async function main() {
  const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
  const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  const path = [UNI, DAI]

  const ETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  const path2 = [ETH,USDT]

  const to = '0xd8500DA651A2e472AD870cDf76B5756F9c113257'
  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const deadline = currentTimestampInSeconds + 86400
  const UNIHOLDER = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'

  const uniswap = await ethers.getContractAt('IUniswap', uniswapAddr)
  const uniContract = await ethers.getContractAt('IERC20', UNI)
  const DAIContract = await ethers.getContractAt('IERC20', DAI)
  const USDTContract = await ethers.getContractAt('IERC20', USDT)

  const AmountOut = ethers.parseEther('5')
  const AmountOutMin = ethers.parseEther('0')
  const AmountinMax = ethers.parseEther('5')

  await network.provider.send('hardhat_setBalance', [
    UNIHOLDER,
    '0x91A76D5E7CC6F7DEE000',
  ])

  const UNISigner = await ethers.getImpersonatedSigner(UNIHOLDER)
  await uniContract.connect(UNISigner).approve(uniswapAddr, AmountinMax)
  console.log(ethers.formatUnits(String(await USDTContract.balanceOf(to)), 6))

//   await uniswap
//     .connect(UNISigner)
//     .swapTokensForExactTokens(AmountOut, AmountinMax, path, to, deadline)
//   console.log(await DAIContract.balanceOf(to));

  await uniswap.connect(UNISigner).swapExactETHForTokens(AmountOutMin, path2, to, deadline, {value: AmountOut})
  console.log(ethers.formatUnits(String(await USDTContract.balanceOf(to)), 6));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})