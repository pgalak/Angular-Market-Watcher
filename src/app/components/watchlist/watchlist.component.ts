import { Component, OnInit } from '@angular/core';
import { WatchlistService, Symbol } from './watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchlist: Symbol[];
  selectedRow: number;
  selectedSymbol: string = '';
  isSymbolSelected: boolean = false;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.watchlistService.getWatchlist().subscribe(watchlist => {
      this.watchlist = watchlist;
    });
  }

  onSelectedRow(index: number, symbol: string) {
    this.selectedRow = index;
    this.selectedSymbol = symbol;
    this.isSymbolSelected = true;
    console.log(symbol);
  }

}
