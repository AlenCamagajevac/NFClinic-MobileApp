import { NFC_SCAN_STARTED, NFC_SCAN_ABORTED } from './types';

export const nfcScanStarted = () => {
    return {
        type: NFC_SCAN_STARTED
    };
};

export const nfcScanAborted = () => {
    return {
        type: NFC_SCAN_ABORTED
    };
};
