import { Component, HostListener } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {

  timer = 90;
  minuti = 1;
  secondi = "30";
  subscription!: Subscription;
  isStarted = false;

  /**
   * Imposta minuti e secondi del timer.
   */
  setValues() {

    let timerTmp = this.timer + 0;
    this.minuti = 0;

    while (timerTmp >= 60) {
      timerTmp -= 60;
      this.minuti += 1;
    }

    this.secondi = timerTmp + "";
    if (this.secondi.length === 1) this.secondi = "0" + this.secondi;
  }

  @HostListener('document:keydown', ['$event.code']) onKeydown(code: string) {

    if (code === "ArrowUp") {

      this.timer++;
      this.setValues();
    }

    if (code === "ArrowDown" && this.timer > 0) {

      this.timer--;
      this.setValues();
    }

    if (code === "Space") this.setTimer();
  }

  /**
   * Avvia e ferma il timer.
   */
  setTimer() {

    this.isStarted = !this.isStarted;

    if (this.isStarted) {

      this.subscription = interval(1000).subscribe(() => {

        // Decrementa il tempo rimanente di 1 secondo
        if (this.timer > 0) {

          this.timer--;
          this.setValues();
        }

        // Ferma il timer quando il tempo è scaduto
        else {

          this.subscription.unsubscribe();
          this.isStarted = false;
        }
      });
    }

    else this.subscription.unsubscribe();
  }
}
