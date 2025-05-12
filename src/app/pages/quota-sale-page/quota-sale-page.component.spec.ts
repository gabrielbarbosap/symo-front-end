import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaSalePageComponent } from './quota-sale-page.component';

describe('QuotaSalePageComponent', () => {
  let component: QuotaSalePageComponent;
  let fixture: ComponentFixture<QuotaSalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotaSalePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotaSalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
