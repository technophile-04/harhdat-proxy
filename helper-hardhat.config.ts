export interface networkConfigItem {
    blockConfirmations?: number;
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem;
}

const networkConfig: networkConfigInfo = {
    4: {
        blockConfirmations: 6,
    },
    31337: {
        blockConfirmations: 1,
    },
};

const developmentChains = ['hardhat', 'localhost'];

export { networkConfig, developmentChains };
