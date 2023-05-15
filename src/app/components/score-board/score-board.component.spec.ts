import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';

describe('ScoreBoardComponent', () => {
  const gameMock = {
    home: 'Mexico',
    away: 'Canada',
    homeScore: 0,
    awayScore: 0,
    timestamp: 0,
  };

  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the score of the game when valid scores are entered', () => {
    const game = gameMock;
    component.games = [game];

    spyOn(window, 'prompt').and.returnValues('2', '1');

    component.updateScore(game);

    expect(game.homeScore).toBe(2);
    expect(game.awayScore).toBe(1);
  });

  it('should show an alert message when invalid scores are entered', () => {
    const game = gameMock;
    const alertSpy = spyOn(window, 'alert');

    component.games = [game];

    spyOn(window, 'prompt').and.callFake(() => {
      return 'invalid';
    });

    component.updateScore(game);

    component.updateScore(game);

    expect(alertSpy).toHaveBeenCalledWith(
      'Por favor, ingresa valores válido. (Sólo números mayor o igual que 0)'
    );
  });
});
