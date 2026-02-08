import { Component, computed, inject, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { Table } from '../table/table';

@Component({
  selector: 'app-header-cell',
  imports: [NgIconComponent],
  templateUrl: './header-cell.html',
  host: {
    class: 'flex items-center gap-2',
  },
})
export class HeaderCell<TItem> {
  readonly #table = inject(Table);

  public readonly key = input.required<keyof TItem>();

  protected readonly column = computed(() =>
    this.#table.COLUMNS.find((col) => col.key === this.key()),
  );
}
