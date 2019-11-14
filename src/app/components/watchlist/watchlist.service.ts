import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

export interface Symbol {
  symbol: string;
}

@Injectable({providedIn: 'root'})
export class WatchlistService {
  symbols: Symbol[]; 

  constructor() {
    this.symbols = []
  }

  getWatchlist(): Observable<Symbol[]> {
    if(localStorage.getItem('symbols') === null) {
      this.symbols = [];
    } else {
      this.symbols = JSON.parse(localStorage.getItem('symbols'))
    }

    return of(this.symbols);
  }

  addSymbol(symbol: Symbol) {
    this.symbols.push(symbol);
  }

  saveWatchlist() {
    localStorage.setItem('symbols', JSON.stringify(this.symbols));
  }
}