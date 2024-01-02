import { Injectable } from '@angular/core';
import { IMenuItem } from 'app/interfaces/menu-item.interface';
import { Observable, Subject } from 'rxjs';

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
