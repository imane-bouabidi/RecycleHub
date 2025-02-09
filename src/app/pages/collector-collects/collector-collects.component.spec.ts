import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorCollectsComponent } from './collector-collects.component';

describe('CollectorCollectsComponent', () => {
  let component: CollectorCollectsComponent;
  let fixture: ComponentFixture<CollectorCollectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorCollectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectorCollectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
