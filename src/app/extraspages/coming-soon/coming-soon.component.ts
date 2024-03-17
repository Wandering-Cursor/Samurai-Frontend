import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
  
// Cominsoon Component
export class ComingSoonComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;
  _diff!: number;
  secondsToShow: boolean = false;

  ngOnInit(): void {
    // Set the countdown to 13 seconds
    const countdownSeconds = 13;

    // Use interval and take operators to count down 13 seconds
    interval(1000).pipe(
      take(countdownSeconds),
    ).subscribe((count) => {
      const remainingSeconds = countdownSeconds - count;
      this._diff = remainingSeconds * 1000; // Calculate the difference in milliseconds
      this.updateCountdown();
      if (remainingSeconds <= 1) {
        this.showOtherContent();
      }
    });
  }

  showOtherContent() {
    // Perform any action or logic you want here
    // For example, you can set a flag to display other content in the template
    this.secondsToShow = true;
  }
  
  updateCountdown() {
    this._days = this.getDays(this._diff);
    this._hours = this.getHours(this._diff);
    this._minutes = this.getMinutes(this._diff);
    this._seconds = this.getSeconds(this._diff);
  }
  /**
    * Day Set
    */
  getDays(t: number) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  /**
   * Hours Set
   */
  getHours(t: number) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  /**
   * Minutes set
   */
  getMinutes(t: number) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  /**
   * Secound set
   */
  getSeconds(t: number) {
    return Math.floor((t / 1000) % 60);
  }
}
