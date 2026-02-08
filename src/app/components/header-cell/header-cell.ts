import { Component, computed, inject, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroArrowDownMicro,
  heroArrowsUpDownMicro,
  heroArrowUpMicro,
} from '@ng-icons/heroicons/micro';
import { Person } from '../../types/person';
import { Table } from '../table/table';

@Component({
  selector: 'app-header-cell',
  imports: [NgIconComponent],
  templateUrl: './header-cell.html',
  host: {
    class: 'flex items-center gap-2 group cursor-default select-none',
    '[class.cursor-pointer]': 'column()?.sortable',
    '(click)': 'column()?.sortable ? this.updateSortDirection() : null',
  },
})
export class HeaderCell {
  readonly #table = inject(Table);

  protected readonly ICONS = {
    sortAsc: heroArrowUpMicro,
    sortDesc: heroArrowDownMicro,
    sort: heroArrowsUpDownMicro,
  } as const;

  public readonly key = input.required<keyof Person>();

  protected readonly column = computed(() =>
    this.#table.COLUMNS.find((col) => col.key === this.key()),
  );

  protected readonly sortDirection = computed(() => {
    if (!this.column()?.sortable) {
      return undefined;
    }

    const order = this.#table.order();
    if (order.key !== this.key()) {
      return undefined;
    }

    return order.direction;
  });

  protected updateSortDirection() {
    if (!this.column()?.sortable) {
      return;
    }

    if (this.sortDirection() === 'asc') {
      this.#table.order.set({ key: this.key(), direction: 'desc' });
    } else {
      this.#table.order.set({ key: this.key(), direction: 'asc' });
    }
  }
}
