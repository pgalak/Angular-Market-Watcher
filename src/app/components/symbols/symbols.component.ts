import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { DataService } from 'src/app/data.service';
import { Share } from '../../share';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.scss'],
  providers: [DataService, DecimalPipe]
})
export class SymbolsComponent {
  shares$: Observable<Share[]>;

  constructor(public dataService: DataService) {
    this.shares$ = dataService.shares$
  }
}
