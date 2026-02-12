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
  inject,
  Injector,
  viewChild,
} from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroBars2 } from '@ng-icons/heroicons/outline';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-column-order-menu',
  imports: [CdkDrag, CdkDragHandle, CdkDropList, NgIconComponent],
  templateUrl: './column-order-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnOrderMenuComponent {
  readonly #table = inject(TableComponent);
  readonly #injector = inject(Injector);

  protected readonly ICONS = {
    dragHandle: heroBars2,
  } as const;

  protected readonly columnOrder = this.#table.columnOrder;

  protected readonly columns = this.#table.columns;

  protected readonly dropList = viewChild.required(CdkDropList);

  protected onDrop(event: Pick<CdkDragDrop<void>, 'previousIndex' | 'currentIndex'>): void {
    this.columnOrder.update((order) => {
      const newOrder = [...order];
      moveItemInArray(newOrder, event.previousIndex, event.currentIndex);
      return newOrder;
    });

    afterNextRender(
      () => {
        const dragHandle = this.dropList()
          .element.nativeElement.getElementsByClassName('cdk-drag-handle')
          .item(event.currentIndex);

        if (dragHandle) {
          (dragHandle as HTMLElement).focus();
        }
      },
      { injector: this.#injector },
    );
  }
}
