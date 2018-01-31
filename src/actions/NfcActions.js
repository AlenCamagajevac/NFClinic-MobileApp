import { NFC_SCAN_STARTED } from './types';

export const nfcScanStarted = () => {
    console.log('action');

    return {
        type: NFC_SCAN_STARTED
    };
};
