import { Component, OnInit } from '@angular/core';
import { BingoBoard } from './bingo-board';
import BingoSquare from './bingo-square';
import BoardService from './board-service/board.service';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrls: ['./bingo-board.component.css'],
  providers: [BoardService]
})
export class BingoBoardComponent implements OnInit {
  squares!: Array<Array<BingoSquare>>;
  copyToClipboard = false;
  isBingo = false;

  constructor(private bs: BoardService) {
    const boardJson = localStorage.getItem("rotgrind-board");
    if (boardJson) {
      const board = JSON.parse(boardJson) as BingoBoard;
      board.date = new Date(board.date);
      const diffTime = Math.abs(new Date().getTime() - board.date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        this.squares = board.squares;
      } else {
        this.newBoard();
      }
    } else {
      this.newBoard();
    }
  }

  ngOnInit(): void {
  }

  public markSquare(square: BingoSquare) {
    square.marked = !square.marked;
    this.isBingo = this.bs.checkBoard(this.squares);
  }

  public onClickExport() {
    navigator.clipboard.writeText(this.bs.createExport(this.squares)).then(() => {
      this.copyToClipboard = true;
      setTimeout(() => {
        this.copyToClipboard = false;
      }, 2000);
    });
  }

  private newBoard(): void {
    this.squares = this.bs.createBoard();
    const board = new BingoBoard(this.squares);
    localStorage.setItem("rotgrind-board", JSON.stringify(board));
  }
}
