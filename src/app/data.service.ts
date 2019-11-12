import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Share } from './share';
import { SHARES } from './shares';
import { DecimalPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';

interface SearchResult {
  shares: Share[];
}

interface State {
  searchTerm: string;
}

function matches(country: Share, term: string, pipe: PipeTransform) {
  return country.Name.toLowerCase().includes(term)
    || pipe.transform(country.Symbol).includes(term)
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _search$ = new Subject<void>();
  private _shares$ = new BehaviorSubject<Share[]>([]);

  private _state: State = {
    searchTerm: ''
  };

    constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      switchMap(() => this._search())
    ).subscribe(result => {
      this._shares$.next(result.shares);
    });
    this._search$.next();
  }

  get shares$() { return this._shares$.asObservable(); }
  get searchTerm() { return this._state.searchTerm; }

  set searchTerm(searchTerm: string) { this._set({searchTerm}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {searchTerm} = this._state;

    // 1. sort
    let shares = SHARES;

    // 2. filter
    shares.filter(share => matches(share, searchTerm, this.pipe));

    return of({shares});
  }
}
