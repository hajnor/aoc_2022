import { readFileSync } from 'fs';

printResult(getFile());

function getFile(): string {
    return readFileSync('./input.txt', 'utf-8');
}

function printResult(file: string): void {
    const messageMarkerLength = 4;

    for (let i = 0; i < file.length; i++) {
        const potentialPacketMarker = file.slice(i, i + messageMarkerLength);
        let isPacketMarker = true;
        for (let j = 0; j < messageMarkerLength - 1; j++) {
            const regex = new RegExp(potentialPacketMarker[j] + ".*" + potentialPacketMarker[j]);
            if (regex.exec(potentialPacketMarker)) {
                isPacketMarker = false;
            }
        }

        if (isPacketMarker) {
            console.log(i + messageMarkerLength);
            break;
        }
    }
}