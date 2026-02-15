import { CdkTableModule } from '@angular/cdk/table';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { COLUMNS } from '../../constants/columns';
import { Params, PeopleService } from '../../data-access/people.service';
import { ResourceDataSource } from '../../data-access/resource.data-source';
import { CountryPipe } from '../../pipes/country-pipe';
import { Column } from '../../types/column';
import { Order } from '../../types/order';
import { Pagination } from '../../types/pagination';
import { Person } from '../../types/person';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { ColumnOrderMenuComponent } from '../column-order-menu/column-order-menu.component';
import { HeaderCellComponent } from '../header-cell/header-cell.component';
import { SideSheetComponent } from '../side-sheet/side-sheet.component';

@Component({
  selector: 'app-table',
  imports: [
    ActionBarComponent,
    CdkTableModule,
    ColumnOrderMenuComponent,
    CountryPipe,
    DatePipe,
    HeaderCellComponent,
    SideSheetComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly #peopleService = inject(PeopleService);

  protected readonly TEXT_COLUMNS: Array<keyof Person> = [
    'firstName',
    'lastName',
    'jobTitle',
    'website',
    'email',
    'phone',
    'company',
    'street',
    'city',
    'zip',
  ];

  protected readonly DATE_COLUMNS: Array<keyof Person> = ['createdAt', 'updatedAt'];

  readonly #columns = COLUMNS;

  public readonly columns = computed(() => {
    const columns: Partial<Record<keyof Person, Column<Person>>> = {};

    for (const column of this.#columns) {
      columns[column.key] = column;
    }

    return columns;
  });

  public readonly order = injectLocalStorage<Order<Person>>('table-order', {
    storageSync: false,
    defaultValue: {
      key: 'firstName',
      direction: 'asc',
    },
  });

  public readonly pagination = injectLocalStorage<Pagination>('table-pagination', {
    storageSync: false,
    defaultValue: {
      pageIndex: 0,
      pageSize: 25,
    },
    stringify: (value) => JSON.stringify({ pageSize: value.pageSize }),
    parse: (value) => {
      const parsed = JSON.parse(value);
      return {
        pageIndex: 0,
        pageSize: parsed.pageSize,
      };
    },
  });

  public readonly columnWidths = injectLocalStorage<Partial<Record<keyof Person, number>>>(
    'table-column-widths',
    {
      defaultValue: {},
    },
  );

  public readonly columnOrder = injectLocalStorage<Array<keyof Person>>('table-column-order', {
    defaultValue: COLUMNS.map((column) => column.key),
  });

  public readonly columnVisibility = injectLocalStorage<Partial<Record<keyof Person, boolean>>>(
    'table-column-visibility',
    {
      defaultValue: {},
    },
  );

  public readonly stickyColumns = injectLocalStorage<Partial<Record<keyof Person, boolean>>>(
    'table-sticky-columns',
    {
      defaultValue: {},
    },
  );

  protected readonly visibleColumns = computed(() =>
    this.columnOrder().filter((columnKey) => this.columnVisibility()[columnKey] !== false),
  );

  public readonly resizing = signal(false);

  public readonly showColumnOrderSideSheet = signal(false);

  readonly #peopleRes = resource({
    params: () =>
      ({
        order: this.order(),
        pagination: this.pagination(),
      }) satisfies Params<Person>,
    loader: ({ abortSignal, params }) => this.#peopleService.getPeople(abortSignal, params),
    defaultValue: [],
  });

  protected readonly dataSource = new ResourceDataSource(this.#peopleRes);

  protected trackById(_: number, person: Person): string {
    return person.id;
  }

  public updateColumnWidth(columnKey: keyof Person, deltaX: number | 'reset'): void {
    if (deltaX === 'reset') {
      this.columnWidths.update((widths) => {
        const { [columnKey]: _, ...rest } = widths;
        return rest;
      });
      return;
    }

    const currentWidth =
      this.columnWidths()[columnKey] ?? this.columns()[columnKey]?.defaultWidth ?? 100;
    const newWidth = Math.max(currentWidth + deltaX, 100);
    this.columnWidths.update((widths) => ({ ...widths, [columnKey]: newWidth }));
  }

  protected resetColumns(): void {
    this.columnOrder.set(COLUMNS.map((column) => column.key));
    this.columnWidths.set({});
    this.columnVisibility.set({});
    this.stickyColumns.set({});
  }
}
