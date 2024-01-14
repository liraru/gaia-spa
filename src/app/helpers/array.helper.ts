import { Sort } from '@angular/material/sort';

export class ArrayHelper {
  private static _sort(a?: number | string, b?: number | string, isAsc: boolean = true) {
    if (!a || !b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  static sort(sort: Sort, data: any[]) {
    if (sort?.active && sort?.direction && data) {
      return data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        return this._sort(a[sort.active], b[sort.active], sort.direction === `asc`);
      });
    }
    return data;
  }
}
