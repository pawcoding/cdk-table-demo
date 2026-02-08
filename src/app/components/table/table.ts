import { CdkTableModule } from '@angular/cdk/table';
import { DatePipe } from '@angular/common';
import { Component, computed, inject, resource, signal } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { COLUMNS } from '../../constants/columns';
import { People } from '../../data-access/people';
import { ResourceDataSource } from '../../data-access/resource.data-source';
import { CountryPipe } from '../../pipes/country-pipe';
import { Column } from '../../types/column';
import { Order } from '../../types/order';
import { Person } from '../../types/person';
import { HeaderCell } from '../header-cell/header-cell';

@Component({
  selector: 'app-table',
  imports: [CdkTableModule, DatePipe, HeaderCell, CountryPipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  readonly #people = inject(People);

  protected readonly visibleColumns: Array<keyof Person> = [
    'avatarUrl',
    'firstName',
    'lastName',
    'jobTitle',
    'company',
    'website',
    'email',
    'phone',
    'street',
    'city',
    'zip',
    'country',
    'createdAt',
    'updatedAt',
  ];

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

  public readonly columnWidths = injectLocalStorage<Partial<Record<keyof Person, number>>>(
    'table-column-widths',
    {
      storageSync: false,
      defaultValue: {},
    },
  );

  public readonly resizing = signal(false);

  readonly #peopleRes = resource({
    params: () => ({
      order: this.order(),
    }),
    loader: ({ abortSignal, params }) => this.#people.getPeople(abortSignal, params),
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
}
