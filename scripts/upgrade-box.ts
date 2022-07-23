import { ethers, network } from 'hardhat';
import { BoxProxyAdmin, BoxV2, ProxyAdmin } from '../typechain-types';

async function main() {
    const boxProxyAdmin: BoxProxyAdmin = await ethers.getContract('BoxProxyAdmin');
    const transparentProxy = await ethers.getContract('Box_Proxy');
    const boxV2: BoxV2 = await ethers.getContract('BoxV2');

    const proxyBoxV1 = await ethers.getContractAt('Box', transparentProxy.address);
    let version = await proxyBoxV1.version();
    console.log(version);

    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address);

    await upgradeTx.wait(1);

    const proxyBoxV2 = await ethers.getContractAt('BoxV2', transparentProxy.address);
    version = await proxyBoxV2.version();
    console.log(version);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
