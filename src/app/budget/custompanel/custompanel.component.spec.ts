import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustompanelComponent } from './custompanel.component';

describe('CustompanelComponent', () => {
  let component: CustompanelComponent;
  let fixture: ComponentFixture<CustompanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustompanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustompanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
