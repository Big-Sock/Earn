const hre = require("hardhat");
const { Contract, utils, providers, constants, BigNumber } = require("ethers")

const OwnerAddress = '0x4E4aeed836e77ae7591776cAE750A720a38ca892'

async function main() {
  await hre.run("compile");

  const XYXToken = await hre.ethers.getContractFactory("BurnYieldBurn");
  const xyxToken = await XYXToken.deploy();
  const EarnToken = await hre.ethers.getContractFactory("EarnYieldEarn");
  const earnToken = await EarnToken.deploy();

  await xyxToken.deployed()
  await earnToken.deployed()

  const EarnSwap = await hre.ethers.getContractFactory("EarnSwap");
  const earnSwap = await EarnSwap.deploy(
    xyxToken.address,
    earnToken.address,
    OwnerAddress
  );

  await earnSwap.deployed()

  await earnToken.approve(earnSwap.address, constants.MaxUint256)


  console.clear();
  console.log(`export const XYXAddress = "${xyxToken.address}";`);
  console.log(`export const EarnAddress = "${earnToken.address}";`);
  console.log(`export const EarnSwapAddress = "${earnSwap.address}";`);
  console.log("SAVE THESE LINES THIS IS CRUCIAL")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
