import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  viewChild,
} from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroEyeMicro, heroEyeSlashMicro } from '@ng-icons/heroicons/micro';
import { heroArrowUp, heroBars2 } from '@ng-icons/heroicons/outline';
import { Person } from '../../types/person';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-column-order-menu',
  imports: [CdkDrag, CdkDragHandle, CdkDropList, NgIconComponent],
  templateUrl: './column-order-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnOrderMenuComponent {
  readonly #table = inject(TableComponent);
  readonly #liveAnnouncer = inject(LiveAnnouncer);
  readonly #injector = inject(Injector);

  protected readonly ICONS = {
    dragHandle: heroBars2,
    visible: heroEyeMicro,
    hidden: heroEyeSlashMicro,
    pin: heroArrowUp,
  } as const;

  protected readonly columnOrder = this.#table.columnOrder;

  protected readonly columns = this.#table.columns;

  protected readonly columnVisibility = this.#table.columnVisibility;

  protected readonly stickyColumns = this.#table.stickyColumns;

  protected readonly dropList = viewChild.required(CdkDropList);

  protected readonly lastStickyColumnIndex = computed(() => {
    const order = this.columnOrder();
    const stickyColumns = this.stickyColumns();

    return order.reduce((lastStickyIndex, column, index) => {
      if (stickyColumns[column]) {
        return index;
      }

      return lastStickyIndex;
    }, -1);
  });

  protected onDrop(event: Pick<CdkDragDrop<void>, 'previousIndex' | 'currentIndex'>): void {
    document.getSelection()?.removeAllRanges();
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    const wasPreviouslySticky = event.previousIndex <= this.lastStickyColumnIndex() + 1;
    let isCurrentlySticky;
    if (event.currentIndex > event.previousIndex) {
      isCurrentlySticky = !(event.currentIndex > this.lastStickyColumnIndex());
    } else {
      isCurrentlySticky = event.currentIndex <= this.lastStickyColumnIndex() + 1;
    }

    const previousIndex = wasPreviouslySticky ? event.previousIndex : event.previousIndex - 1;
    const currentIndex = isCurrentlySticky ? event.currentIndex : event.currentIndex - 1;

    if (previousIndex !== currentIndex) {
      this.columnOrder.update((order) => {
        const newOrder = [...order];
        moveItemInArray(newOrder, previousIndex, currentIndex);
        return newOrder;
      });
    }

    if (wasPreviouslySticky !== isCurrentlySticky) {
      const columnKey = this.columnOrder()[currentIndex];
      this.stickyColumns.update((stickyColumns) => ({
        ...stickyColumns,
        [columnKey]: isCurrentlySticky,
      }));

      const columnLabel = this.columns()[columnKey]?.label ?? columnKey;
      this.#liveAnnouncer.announce(
        `${columnLabel} column is now ${isCurrentlySticky ? 'pinned' : 'unpinned'}`,
        'polite',
        3000,
      );
    }

    afterNextRender(
      {
        read: () => {
          this.focusDragHandle(currentIndex);
        },
      },
      { injector: this.#injector },
    );
  }

  protected focusDragHandle(index: number): void {
    const dragHandle = this.dropList()
      .element.nativeElement.getElementsByClassName('cdk-drag-handle')
      .item(index);

    if (dragHandle) {
      (dragHandle as HTMLElement).focus();
    }
  }

  protected focusVisibilityToggle(index: number): void {
    const visibilityToggle = this.dropList()
      .element.nativeElement.getElementsByClassName('visibility-toggle')
      .item(index);

    if (visibilityToggle) {
      (visibilityToggle as HTMLElement).focus();
    }
  }

  protected toggleColumnVisibility(columnKey: keyof Person, isVisible: boolean): void {
    this.columnVisibility.update((visibility) => ({
      ...visibility,
      [columnKey]: isVisible,
    }));

    this.#liveAnnouncer.announce(
      `${this.columns()[columnKey]?.label ?? columnKey} column is now ${isVisible ? 'shown' : 'hidden'} in the table`,
      'polite',
      3000,
    );
  }
}
