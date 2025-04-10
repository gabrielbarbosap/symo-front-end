import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeAndWinnersComponent } from './prize-and-winners.component';

describe('PrizeAndWinnersComponent', () => {
  let component: PrizeAndWinnersComponent;
  let fixture: ComponentFixture<PrizeAndWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrizeAndWinnersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrizeAndWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
