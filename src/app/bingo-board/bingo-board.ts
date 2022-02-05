import BingoSquare from "./bingo-square";

export class BingoBoard {
    public date: Date;
    public constructor(public squares: Array<Array<BingoSquare>>) {
        this.date = new Date();
    }
}