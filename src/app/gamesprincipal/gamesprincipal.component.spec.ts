import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesprincipalComponent } from './gamesprincipal.component';

describe('GamesprincipalComponent', () => {
  let component: GamesprincipalComponent;
  let fixture: ComponentFixture<GamesprincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesprincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
