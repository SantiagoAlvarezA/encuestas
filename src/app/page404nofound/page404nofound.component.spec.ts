import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404nofoundComponent } from './page404nofound.component';

describe('Page404nofoundComponent', () => {
  let component: Page404nofoundComponent;
  let fixture: ComponentFixture<Page404nofoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page404nofoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page404nofoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
