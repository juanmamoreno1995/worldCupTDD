import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AppComponent', () => {
  const gameMock = {
    home: 'Mexico',
    away: 'Canada',
    homeScore: 0,
    awayScore: 0,
    timestamp: 0,
  };

  const gamesMock = [
    {
      home: 'Mexico',
      away: 'Canada',
      homeScore: 0,
      awayScore: 0,
      timestamp: 0,
    },
    {
      home: 'Spain',
      away: 'Brazil',
      homeScore: 0,
      awayScore: 0,
      timestamp: 0,
    },
  ];

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load the games from JSON', () => {
    const games = gamesMock;

    component.ngOnInit();
    const request = httpMock.expectOne('assets/json/matches.json');
    expect(request.request.method).toBe('GET');
    request.flush(games);

    expect(component.games).toEqual(games);
  });

  it('should start a game when the start button is clicked', () => {
    const game = gameMock;

    component.startGame(game);

    expect(component.gamesInPlay).toContain(game);
    expect(game.timestamp).toBeGreaterThan(0);
  });

  it('should finish a game when finishGame() is called', () => {
    const game = gameMock;
    component.games = [game];

    component.finishGame(game);
    expect(component.finishedGames).toContain(game);
  });

  it('should return the summary of games sorted by scores and timestamp', () => {
    // Arrange
    const game1 = {
      home: 'Equipo A',
      away: 'Equipo B',
      homeScore: 1,
      awayScore: 2,
      timestamp: 1638912000000,
    };
    const game2 = {
      home: 'Equipo C',
      away: 'Equipo D',
      homeScore: 3,
      awayScore: 3,
      timestamp: 1638915000000,
    };
    const game3 = {
      home: 'Equipo E',
      away: 'Equipo F',
      homeScore: 2,
      awayScore: 1,
      timestamp: 1638913000000,
    };
    const game4 = {
      home: 'Equipo G',
      away: 'Equipo H',
      homeScore: 0,
      awayScore: 0,
      timestamp: 1638914000000,
    };

    component.gamesInPlay = [game3, game4];
    component.finishedGames = [game1, game2];
    component.allGames = [...component.gamesInPlay, ...component.finishedGames];

    // Act
    const result = component.getSummary();

    // Assert
    expect(result.length).toBe(4);
    expect(result[0]).toEqual(game2);
    expect(result[1]).toEqual(game1);
    expect(result[2]).toEqual(game3);
    expect(result[3]).toEqual(game4);
  });
});
