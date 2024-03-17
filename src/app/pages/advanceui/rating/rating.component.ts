import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  // bread crum items
  breadCrumbItems!: Array<{}>;

  max = 10;
  rate = 3;
  rate1 = 3;
  readrate = 4.5;
  isReadonly = true;
  x = 5;
  y = 2;

  hovermax = 5;
  hoverrate = 1;
  resetrate = 2;

  overStar: number | undefined = this.hoverrate;
  percent = 0;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Advance UI' }, { label: 'Ratings', active: true }];
  }



  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.resetrate = 0;
  }
}
