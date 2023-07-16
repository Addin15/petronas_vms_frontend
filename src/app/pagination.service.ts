import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private _currentPage = new Subject<number>();

  currentPage = this._currentPage.asObservable()

  constructor() { }

  changePage(index: number) {
    this._currentPage.next(index);
  }
}
