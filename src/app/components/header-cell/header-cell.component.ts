import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroArrowDownMicro,
  heroArrowsUpDownMicro,
  heroArrowUpMicro,
} from '@ng-icons/heroicons/micro';
import { Person } from '../../types/person';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-header-cell',
  imports: [NgIconComponent, CdkDrag],
  templateUrl: './header-cell.component.html',
  host: {
    class: 'group cursor-default select-none relative p-2 block',
  },
})
export class HeaderCellComponent {
  readonly #table = inject(TableComponent);

  protected readonly ICONS = {
    sortAsc: heroArrowUpMicro,
    sortDesc: heroArrowDownMicro,
    sort: heroArrowsUpDownMicro,
  } as const;

  public readonly key = input.required<keyof Person>();

  #lastDistanceX?: number;

  protected readonly cdkDrag = viewChild(CdkDrag);

  protected readonly column = computed(() => this.#table.columns()[this.key()]);

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

  protected resizing(isResizing: boolean): void {
    if (!isResizing) {
      this.#lastDistanceX = undefined;
    }

    this.#table.resizing.set(isResizing);
  }

  protected onResize(event: CdkDragMove): void {
    const deltaX = event.distance.x - (this.#lastDistanceX ?? 0);
    this.#lastDistanceX = event.distance.x;

    this.#table.updateColumnWidth(this.key(), deltaX);

    this.cdkDrag()?.reset();
  }

  protected resetColumnWidth(): void {
    this.#table.updateColumnWidth(this.key(), 'reset');
  }
}
