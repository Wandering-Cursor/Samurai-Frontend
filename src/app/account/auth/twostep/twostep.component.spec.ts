import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwostepComponent } from './twostep.component';

describe('TwostepComponent', () => {
  let component: TwostepComponent;
  let fixture: ComponentFixture<TwostepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwostepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwostepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
