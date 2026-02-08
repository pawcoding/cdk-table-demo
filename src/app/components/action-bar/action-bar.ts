import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { Toolbar, ToolbarWidget } from '@angular/aria/toolbar';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, computed, inject, viewChild } from '@angular/core';
import { Table } from '../table/table';

@Component({
  selector: 'app-action-bar',
  imports: [ToolbarWidget, Menu, MenuContent, MenuItem, MenuTrigger, OverlayModule],
  templateUrl: './action-bar.html',
  host: {
    class:
      'block fixed bottom-1 left-1/2 -translate-x-1/2 p-2 bg-neutral-100 border border-neutral-200 rounded-md shadow-md',
    'aria-label': 'Table actions',
  },
  hostDirectives: [Toolbar],
})
export class ActionBar {
  readonly #table = inject(Table);

  protected readonly pageMenu = viewChild<Menu<number>>('pageMenu');

  protected readonly pageSize = computed(() => this.#table.pagination().pageSize);

  protected readonly PAGE_SIZES = [10, 25, 50, 100];

  protected setPageSize(size: number) {
    if (size === this.pageSize()) {
      this.pageMenu()?.close();
      return;
    }

    this.#table.pagination.set({
      pageSize: size,
      pageIndex: 0,
    });
  }
}
