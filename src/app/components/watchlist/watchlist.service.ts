import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface Symbol {
  symbol: string;
}

export interface Row {
  id: number;
  symbol: string;
  isSelected: boolean;
}

@Injectable({providedIn: 'root'})
export class WatchlistService {
  symbols: Symbol[]; 
  selectedRow: BehaviorSubject<Row> = new BehaviorSubject({id: null, symbol: '', isSelected: false});

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

  deleteSymbol(row: Row) {
    this.symbols.splice(row.id, 1);
  }

  saveWatchlist() {
    localStorage.setItem('symbols', JSON.stringify(this.symbols));
  }
}