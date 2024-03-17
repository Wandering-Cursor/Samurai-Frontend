import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarareaComponent } from './polararea.component';

describe('PolarareaComponent', () => {
  let component: PolarareaComponent;
  let fixture: ComponentFixture<PolarareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolarareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolarareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
