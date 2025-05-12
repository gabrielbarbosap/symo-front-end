import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingDailyCardComponent } from './ranking-daily-card.component';

describe('RankingDailyCardComponent', () => {
  let component: RankingDailyCardComponent;
  let fixture: ComponentFixture<RankingDailyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingDailyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RankingDailyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
