import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { DataService } from 'src/app/data.service';
import { Share } from '../../share';
import { WatchlistService, Symbol } from '../watchlist/watchlist.service';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.scss'],
  providers: [DataService, DecimalPipe]
})
export class SymbolsComponent {
  shares$: Observable<Share[]>;
  selectedRow: number;
  selectedSymbol: string = '';
  isShareSelected: boolean = false;

  constructor(public dataService: DataService,
              private watchlistService: WatchlistService) 
  {
    this.shares$ = dataService.shares$
  }

  onSelectedRow(index: number, symbol: string) {
    this.selectedRow = index;
    this.selectedSymbol = symbol;
    this.isShareSelected = true;
  }

  onAdd() {
    const newSymbol: Symbol = {
      symbol: this.selectedSymbol
    }
    this.watchlistService.addSymbol(newSymbol);
  }

  onDelete() {

  }

  onSave() {
    this.watchlistService.saveWatchlist();
  }
}
