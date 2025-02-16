import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPrizeDrawComponent } from './header-prize-draw.component';

describe('HeaderPrizeDrawComponent', () => {
  let component: HeaderPrizeDrawComponent;
  let fixture: ComponentFixture<HeaderPrizeDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPrizeDrawComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderPrizeDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
