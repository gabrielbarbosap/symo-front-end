import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrizeDrawComponent } from './card-prize-draw.component';

describe('CardPrizeDrawComponent', () => {
  let component: CardPrizeDrawComponent;
  let fixture: ComponentFixture<CardPrizeDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPrizeDrawComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPrizeDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
