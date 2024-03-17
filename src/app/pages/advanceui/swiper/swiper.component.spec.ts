import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipersComponent } from './swiper.component';

describe('SwiperComponent', () => {
  let component: SwipersComponent;
  let fixture: ComponentFixture<SwipersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwipersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
