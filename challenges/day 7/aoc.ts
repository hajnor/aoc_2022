import { readFileSync } from 'fs';
interface Directory {
    name: string;
    size: number;
    parent: string;
    children: string[];
}

enum SolutionConstant {
    RootDirectory = '/',
    CDCommand = '$ cd',
    LSCommand = "$ ls",
    UpperDirectory = '..',
    DirectorySign = 'dir'
}

class Solution {
    private readonly maxDirectorySize: number;
    private readonly spaceNeeded: number;
    private readonly maxSpace: number;

    constructor({ maxDirectorySize, spaceNeeded, maxSpace }: { maxDirectorySize: number, spaceNeeded: number; maxSpace: number }) {
        this.maxDirectorySize = maxDirectorySize;
        this.spaceNeeded = spaceNeeded;
        this.maxSpace = maxSpace;
        this.printResults(this.getInput());
    }

    private getInput(): string[] {
        const file = readFileSync('./input.txt', 'utf-8');
        return file.split(/\r?\n/);
    }

    private printResults(input: string[]): void {
        const directoryNameDirectoryMap = this.getDirectoryNameDirectoryMap(input);
        console.log(this.getResult1(directoryNameDirectoryMap));
        console.log(this.getResult2(directoryNameDirectoryMap));
    }

    private getDirectoryNameDirectoryMap(input: string[]): Record<string, Directory> {
        const directoryNameDirectoryMap: Record<string, Directory> = {};
        let currentDirectoryStructure: string[] = [];

        input.forEach(command => {
            if (command.startsWith(SolutionConstant.CDCommand)) {
                const directory = command.split(SolutionConstant.CDCommand)[1].trim();
                if (directory === SolutionConstant.UpperDirectory) {
                    currentDirectoryStructure.pop();
                } else {
                    if (directory === SolutionConstant.RootDirectory) {
                        currentDirectoryStructure = [directory];
                    } else {
                        currentDirectoryStructure.push(directory);
                    }

                    const name = currentDirectoryStructure.join('/');

                    if (!directoryNameDirectoryMap[name]) {
                        const parent = currentDirectoryStructure.slice(0, -1).join('/');

                        directoryNameDirectoryMap[name] = {
                            name,
                            size: 0,
                            parent,
                            children: []
                        };

                        directoryNameDirectoryMap[parent]?.children.push(name);
                    }

                }
            } else if (!command.startsWith(SolutionConstant.LSCommand) && !command.startsWith(SolutionConstant.DirectorySign)) {
                const size = Number(command.split(' ')[0].trim());
                const currentDirectory = currentDirectoryStructure.join('/');
                directoryNameDirectoryMap[currentDirectory].size += size;

                let nextParent = directoryNameDirectoryMap[currentDirectory].parent;
                while (nextParent) {
                    const currentParent = directoryNameDirectoryMap[nextParent];
                    currentParent.size += size;
                    nextParent = currentParent.parent;
                }
            }
        });

        return directoryNameDirectoryMap;
    }

    private getResult1(directoryNameDirectoryMap: Record<string, Directory>): number {
        const limit = this.maxDirectorySize + 1;
        let total = 0;

        Object.values(directoryNameDirectoryMap).forEach(({ size }) => {
            if (size < limit) {
                total += size;
            }
        });

        return total;

    }

    private getResult2(directoryNameDirectoryMap: Record<string, Directory>): number {
        const extraSpaceNeeded = this.getExtraSpaceNeeded(directoryNameDirectoryMap[SolutionConstant.RootDirectory].size);
        let maxSize = this.maxSpace;

        Object.values(directoryNameDirectoryMap).forEach(({ size }) => {
            if (size >= extraSpaceNeeded && size < maxSize) {
                maxSize = size;
            }
        });

        return maxSize;

    }

    private getExtraSpaceNeeded(usedSpace: number): number {
        const spaceAvailable = this.maxSpace - usedSpace;
        return this.spaceNeeded - spaceAvailable;
    }
}

new Solution({ maxDirectorySize: 100000, spaceNeeded: 30000000, maxSpace: 70000000 });
