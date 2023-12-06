import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMenuItem } from '../interfaces/menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationStatusService {
  constructor() {}

  private _activeMenuItem: Subject<IMenuItem> = new Subject<IMenuItem>();

  public getActiveMenuItem(): Observable<IMenuItem> {
    return this._activeMenuItem.asObservable();
  }

  public setActiveMenuItem(item: IMenuItem) {
    this._activeMenuItem.next(item);
  }
}
