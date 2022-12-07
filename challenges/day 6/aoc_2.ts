import { readFileSync } from 'fs';

printResult(getFile());

function getFile(): string {
    return readFileSync('./input.txt', 'utf-8');
}

function printResult(file: string): void {
    const messageMarkerLength = 14;

    for (let i = 0; i < file.length; i++) {
        const potentialMessageMarker = file.slice(i, i + messageMarkerLength);
        let isMessageMarker = true;
        for (let j = 0; j < messageMarkerLength - 1; j++) {
            const regex = new RegExp(potentialMessageMarker[j] + ".*" + potentialMessageMarker[j]);
            if (regex.exec(potentialMessageMarker)) {
                isMessageMarker = false;
                break;
            }
        }

        if (isMessageMarker) {
            console.log(i + messageMarkerLength);
            break;
        }
    }
}