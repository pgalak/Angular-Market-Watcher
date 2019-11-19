import { Component, OnInit } from '@angular/core';

import { WatchlistService, Symbol, Row } from './watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchlist: Symbol[];
  public row: Row = {
    id: null,
    symbol: '',
    isSelected: false
  }

  constructor(
    private watchlistService: WatchlistService,

  ) { }

  ngOnInit() {
    this.watchlistService.getWatchlist().subscribe(watchlist => {
      this.watchlist = watchlist;
    });
  }

  onSelectedRow(index: number, symbol: string) {
    this.row.id = index;
    this.row.symbol = symbol;
    this.row.isSelected = true;
    this.watchlistService.selectedRow.next(this.row);
    console.log(this.row);
  }
}