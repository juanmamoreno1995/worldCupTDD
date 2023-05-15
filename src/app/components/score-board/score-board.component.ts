import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
})
export class ScoreBoardComponent  {
  @Input() games: Game[] = [];
  @Input() option: number = 1;
  @Input() title: string = '';
  @Output() finishGameOutput = new EventEmitter<Game>();

  constructor() {}

  finishGame(game: Game) {
    this.finishGameOutput.emit(game);
  }

  updateScore(game: Game) {
    const newHomeScoreStr = prompt(
      `Nuevos goles del equipo local (${game.home}):`
    );
    const newAwayScoreStr = prompt(
      `Nuevos goles del equipo visitante (${game.away}):`
    );

    const newHomeScore = parseInt(newHomeScoreStr || '', 10);
    const newAwayScore = parseInt(newAwayScoreStr || '', 10);
    debugger;
    if (
      isNaN(newHomeScore) ||
      newHomeScore < 0 ||
      isNaN(newAwayScore) ||
      newAwayScore < 0
    ) {
      return alert(
        'Por favor, ingresa valores válido. (Sólo números mayor o igual que 0)'
      );
    }

    game.homeScore = newHomeScore;
    game.awayScore = newAwayScore;
  }
}
