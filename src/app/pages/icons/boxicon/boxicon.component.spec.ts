import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxiconComponent } from './boxicon.component';

describe('BoxiconComponent', () => {
  let component: BoxiconComponent;
  let fixture: ComponentFixture<BoxiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxiconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
