import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPrizeDrawComponent } from './btn-prize-draw.component';

describe('BtnPrizeDrawComponent', () => {
  let component: BtnPrizeDrawComponent;
  let fixture: ComponentFixture<BtnPrizeDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnPrizeDrawComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnPrizeDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
