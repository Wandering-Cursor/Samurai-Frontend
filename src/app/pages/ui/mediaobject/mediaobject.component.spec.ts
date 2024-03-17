import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaobjectComponent } from './mediaobject.component';

describe('MediaobjectComponent', () => {
  let component: MediaobjectComponent;
  let fixture: ComponentFixture<MediaobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaobjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
