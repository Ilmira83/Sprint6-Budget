import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustombudgetComponent } from './custombudget.component';

describe('CustombudgetComponent', () => {
  let component: CustombudgetComponent;
  let fixture: ComponentFixture<CustombudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustombudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustombudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
