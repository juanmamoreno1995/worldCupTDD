import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Game } from './interfaces/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  games: Game[] = [];
  finishedGames: Game[] = [];
  gamesInPlay: Game[] = [];
  allGames: Game[] = [];
  option: number = 1; // 0: sumamry 1: Board

  constructor(private http: HttpClient) {}

  getSummary(): Game[] {
    this.option = 0;
    this.allGames = Array.from(
      new Set([...this.gamesInPlay, ...this.finishedGames])
    );
    return this.allGames.sort((a, b) => {
      const totalScoresDiff =
        b.homeScore + b.awayScore - (a.homeScore + a.awayScore);

      return totalScoresDiff !== 0
        ? totalScoresDiff
        : a.timestamp - b.timestamp;
    });
  }

  startGame(game: Game): void {
    if (!this.gamesInPlay.includes(game)) {
      game.timestamp = Date.now();
      this.gamesInPlay.push(game);
    }
    this.option = 1;
  }

  finishGame(game: Game) {
    this.finishedGames.push(game);
    this.gamesInPlay = this.gamesInPlay.filter((g) => g !== game);
  }

  private loadGamesFromJSON(): void {
    this.http.get<Game[]>('assets/json/matches.json').subscribe((res) => {
      this.games = res;
    });
  }

  ngOnInit(): void {
    this.loadGamesFromJSON();
  }
}
