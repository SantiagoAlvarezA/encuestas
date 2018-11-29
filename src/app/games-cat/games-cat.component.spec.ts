import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCatComponent } from './games-cat.component';

describe('GamesCatComponent', () => {
  let component: GamesCatComponent;
  let fixture: ComponentFixture<GamesCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
