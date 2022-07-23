import { DeployFunction } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { developmentChains, networkConfig } from '../helper-hardhat.config';
import { verify } from '../utils/verify';

const deployFunc: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;
    const { log, deploy } = deployments;
    const deployer = (await getNamedAccounts()).deployer;
    const { chainId } = network.config;

    log('-------------------------');
    const box = await deploy('Box', {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: networkConfig[chainId!].blockConfirmations || 1,
        proxy: {
            proxyContract: 'OpenZeppelinTransparentProxy',
            viaAdminContract: {
                name: 'BoxProxyAdmin',
                artifact: 'BoxProxyAdmin',
            },
        },
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log('Verifying...');
        await verify(box.address, []);
    }
};

export default deployFunc;
