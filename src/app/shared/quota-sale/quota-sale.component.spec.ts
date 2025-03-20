import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaSaleComponent } from './quota-sale.component';

describe('QuotaSaleComponent', () => {
  let component: QuotaSaleComponent;
  let fixture: ComponentFixture<QuotaSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotaSaleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotaSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
