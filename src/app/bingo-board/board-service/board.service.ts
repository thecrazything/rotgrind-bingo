import { Injectable } from "@angular/core";
import BingoSquare from "../bingo-square";

@Injectable()
export default class BoardService {
    private readonly RED_SQUARE = "🟥";
    private readonly BLACK_SQUARE = "⬛";
    private readonly SPARKLES = "✨";

    public createBoard(): Array<Array<BingoSquare>> {
        const board = [];
        const exclude: string[] = [];
        for (let i = 0; i < 5; i++) {
            const row = [];
            for (let j = 0; j < 5; j++) {
                if (i === 2 && j === 2) {
                    const free = new BingoSquare("Free Square");
                    free.marked = true;
                    row.push(free);
                } else {
                    const text = this.getRandomText(exclude);
                    exclude.push(text);
                    row.push(new BingoSquare(text));
                }
            }
            board.push(row);
        }
        return board;
    }

    public getRandomText(exclude: string[]): string {
        const texsts = [
            "Rehua makes an animal friend",
            "Tannhauser attempts to start a revolution",
            "Oran eats someone",
            "OnCall reluctantly allows it",
            "Someone refuses a heal, fails at healing themselves",
            "Convenient Hero Point",
            "Rehua is adorable",
            "NPC comments on Vaalis drinking",
            "Vaalis does some sweet swashbuckler shit",
            "NPC thinks Oran is high",
            "Everyone runs away",
            "Arson",
            "OnCall makes them suffer",
            "A completely avoidable fight breaks out",
            "A car drives by Earndils house",
            "Clowns",
            "Crabs",
            "Someone gets hurt by a mundane activity",
            "Rotpoint aquired",
            "A reroll makes it worse",
            "Pirate-related pun",
            "Bird-related pun",
            "Healing makes it worse",
            "Tannhauser ignores strategy",
            "Mimic",
            "Rotgrind namedrop",
            "Tannhauser starts a union",
            "Pub crawl",
            "Drunk character gets hurt because drunk",
            "Character should not have survived",
            "Feral child gang",
            "Heartbreak moment (Romantic)",
            "Heartbreak moment (Platonic)",
            "Crab army",
            "Vaali throws up on a PC",
            "Vaali throws up on an NPC",
            "Chat throws money at the problem",
            "Rehua healing hug",
            "OnCall denies wholesome moment",
            "Enemy explodes",
            "Enemy looks particularly evil",
            "One of the PCs parents show up",
            "Shopping spree",
            "Baldric screams WHAT",
            "Baldric Aquires Ingredient",
            "We are denied a look under the helmet"
        ].filter(x => exclude.indexOf(x) < 0);
        return texsts[this.getRandomInt(texsts.length)];
    }

    public createExport(squares: Array<Array<BingoSquare>>): string {
        const isBingo = this.checkBoard(squares);
        let result = !isBingo ? "Rotgrind Bingo Result!\n" : this.SPARKLES + "Rotgrind BINGO! " + this.SPARKLES + "\n\n";
        for (let i = 0; i < squares.length; i++) {
            result += "      ";
            for(let j = 0; j < squares.length; j++) {
                const marked = squares[i][j].marked;
                if (marked) {
                    result += this.RED_SQUARE;
                } else {
                    result += this.BLACK_SQUARE;
                }
            }
            result += "\n";
        }
        return result;
    }

    public checkBoard(squares: Array<Array<BingoSquare>>): boolean {
        let isBingo = false;
        // check for horizontal bingo
        for(let i = 0; i < 5; i++) {
            let isRowBingo = true;
            for (let j = 0; j < 5; j++) {
                if (!squares[i][j].marked) {
                    isRowBingo = squares[i][j].marked;
                    if (!isRowBingo) {
                        break;
                    }
                }
            }
            if (isRowBingo) {
                isBingo = true;
                break;
            }
        }
        
        if (isBingo) {
            return isBingo;
        }

        // check vertical
        for(let i = 0; i < 5; i++) {
            let isColumnBingo = true;
            for(let j = 0; j < 5; j++) {
                if (!squares[j][i].marked) {
                    isColumnBingo = squares[j][i].marked;
                    if (!isColumnBingo) {
                        break;
                    }
                }
            }
            if (isColumnBingo) {
                isBingo = true;
                break;
            }
        }

        if (isBingo) {
            return isBingo;
        }

        // check across left-right
        let isAcrossBingo = true;
        for (let i = 0; i < 5; i++) {
            isAcrossBingo = squares[i][i].marked;
            if (!isAcrossBingo) {
                break;
            }
        }
        isBingo = isAcrossBingo;

        if (isBingo) {
            return isBingo;
        }

        // check across right-left
        isAcrossBingo = true;
        for (let i = 0; i < 5; i++) {
            isAcrossBingo = squares[i][4 - i].marked;
            if (!isAcrossBingo) {
                break;
            }
        }
        isBingo = isAcrossBingo;

        if (isBingo) {
            return isBingo;
        }

        // check corner bingo
        isBingo = squares[0][0].marked && squares[0][4].marked && squares[4][0].marked && squares[4][4].marked;

        return isBingo;
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
      }
}