import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweepstakesGridComponent } from './sweepstakes-grid.component';

describe('SweepstakesGridComponent', () => {
  let component: SweepstakesGridComponent;
  let fixture: ComponentFixture<SweepstakesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweepstakesGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SweepstakesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
