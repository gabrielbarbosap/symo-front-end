import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaSelectionComponent } from './quota-selection.component';

describe('QuotaSelectionComponent', () => {
  let component: QuotaSelectionComponent;
  let fixture: ComponentFixture<QuotaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotaSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
