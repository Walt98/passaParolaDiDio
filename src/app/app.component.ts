import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare type PassaParola = { key: string; status: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit
{
  title = "PassaParola di Dio";
  index?: number;
  isReady = false;
  items: PassaParola[] = [];

  ngOnInit(): void {

    alert("Compatibile solo con dispositivi dotati di tastiera!".toUpperCase());
    this.setItems();
    addEventListener("keydown", (e: KeyboardEvent) => this.setIndexStatus(e.code));
  }

  /**
   * Imposta l'array items.
   */
  private setItems() {

    let n = prompt("Inserisci il numero di lettere.", "6");

    if (!!n && !!+n && +n > 0 && +n < 16) {
      for (let i = 0; i < +n; i++) {

        const messages = ["Inserisci la lettera.", "Assicurati di inserirne una non ancora presente per un corretto funzionamento del programma."];
        let item = prompt(messages.join("\n"));
  
        if (!!item) {
          this.items.push({ key: item.toUpperCase(), status: "" });
        }
  
        if (i === +n - 1) {
          if (this.items.length === +n) this.isReady = true;
          else alert("Assicurati di aver inserito correttamente le lettere.");
        }
      }
    }
    else alert("Assicurati di inserire un numero compreso tra 1 e 15 per continuare.");
  }

  /**
   * Imposta l'index e lo status delle lettere.
   */
  private setIndexStatus(code: string) {

    if (code.includes("Key")) {

      let item = this.items.find(i => i.key === code[3]);
      if (!!item) this.index = this.items.indexOf(item);
    }

    // Va solo avanti
    if (code === "ArrowRight") {

      if (this.index === undefined) this.index = 0;

      else if (this.index === this.items.length - 1) {

        this.index = 0;
        while (!["", "skip"].includes(this.items[this.index].status)) this.index++;
      }

      else {

        do {
          if (this.index === this.items.length - 1) this.index = 0;
          else this.index++;
        }
        while (!["", "skip"].includes(this.items[this.index].status));
      }
    }

    // Va solo indietro
    if (code === "ArrowLeft") {

      if (this.index === undefined) this.index = 0;

      else if (this.index === 0) {

        this.index = this.items.length - 1;
        while (!["", "skip"].includes(this.items[this.index].status)) this.index--;
      }

      else {

        do {
          if (this.index === 0) this.index = this.items.length - 1;
          else this.index--;
        }
        while (!["", "skip"].includes(this.items[this.index].status));
      }
    }

    // PassaParola
    if (code === "Space") {

      if (this.index !== undefined) this.items[this.index].status = "skip";
    }

    // Corretto
    if (code === "Enter") {

      if (this.index !== undefined) this.items[this.index].status = "success";
    }

    // Sbagliato
    if (code === "Backspace") {

      if (this.index !== undefined) this.items[this.index].status = "error";
    }

    // Annulla
    if (code === "Escape") {

      if (this.index !== undefined) this.items[this.index].status = "";
    }
  }
}
