import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOverviewComponent } from './property-overview.component';

describe('PropertyOverviewComponent', () => {
  let component: PropertyOverviewComponent;
  let fixture: ComponentFixture<PropertyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
