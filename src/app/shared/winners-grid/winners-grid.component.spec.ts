import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersGridComponent } from './winners-grid.component';

describe('WinnersGridComponent', () => {
  let component: WinnersGridComponent;
  let fixture: ComponentFixture<WinnersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnersGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
