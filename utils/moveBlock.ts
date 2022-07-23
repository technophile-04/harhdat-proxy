import { network } from 'hardhat';
import { deflate } from 'zlib';

export function sleep(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(0);
        }, time);
    });
}

export async function moveBlocks(numberOfBlocksTobeMoved: number, sleepAmount = 0) {
    console.log('Moving Blocks...');

    for (let index = 0; index < numberOfBlocksTobeMoved; index++) {
        await network.provider.send('evm_mine');
    }

    if (sleepAmount) {
        console.log(`Sleeping for ${sleepAmount}`);
        await sleep(sleepAmount);
    }
}
