import { Component, OnInit } from '@angular/core';
import { WatchlistService, Symbol } from './watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchlist: Symbol[];

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.watchlistService.getWatchlist().subscribe(watchlist => {
      this.watchlist = watchlist;
    });
  }

}
