import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { Toolbar, ToolbarWidget } from '@angular/aria/toolbar';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, computed, inject, viewChild } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroChevronLeftMini,
  heroChevronRightMini,
  heroViewColumnsMini,
} from '@ng-icons/heroicons/mini';
import { Table } from '../table/table';

@Component({
  selector: 'app-action-bar',
  imports: [
    Menu,
    MenuContent,
    MenuItem,
    MenuTrigger,
    NgIconComponent,
    OverlayModule,
    ToolbarWidget,
  ],
  templateUrl: './action-bar.html',
  host: {
    class:
      'block fixed bottom-1 left-1/2 -translate-x-1/2 p-2 bg-neutral-100 border border-neutral-200 rounded-md not-dark:shadow-md flex items-center gap-2 dark:bg-neutral-800 dark:border-neutral-700',
    'aria-label': 'Table actions',
  },
  hostDirectives: [Toolbar],
})
export class ActionBar {
  readonly #table = inject(Table);

  protected readonly ICONS = {
    previous: heroChevronLeftMini,
    next: heroChevronRightMini,
    columns: heroViewColumnsMini,
  } as const;

  protected readonly pageMenu = viewChild<Menu<number>>('pageMenu');

  protected readonly pageSize = computed(() => this.#table.pagination().pageSize);

  protected readonly pageIndex = computed(() => this.#table.pagination().pageIndex);

  protected readonly maxIndex = computed(() => Math.ceil(500 / this.pageSize()));

  protected readonly PAGE_SIZES = [10, 25, 50, 100];

  protected setPageSize(size: number): void {
    if (size === this.pageSize()) {
      this.pageMenu()?.close();
      return;
    }

    this.#table.pagination.set({
      pageSize: size,
      pageIndex: 0,
    });
  }

  protected goToPage(delta: number): void {
    const newIndex = this.pageIndex() + delta;

    if (newIndex < 0 || newIndex >= this.maxIndex()) {
      return;
    }

    this.#table.pagination.update((pagination) => ({ ...pagination, pageIndex: newIndex }));
  }

  protected toggleColumnOrderSideSheet(): void {
    this.#table.showColumnOrderSideSheet.update((show) => !show);
  }
}
