import { CdkTableModule } from '@angular/cdk/table';
import { DatePipe } from '@angular/common';
import { Component, inject, resource, signal } from '@angular/core';
import { COLUMNS } from '../../constants/columns';
import { People } from '../../data-access/people';
import { ResourceDataSource } from '../../data-access/resource.data-source';
import { CountryPipe } from '../../pipes/country-pipe';
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

  protected readonly columns: Array<keyof Person> = [
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

  public readonly COLUMNS = COLUMNS;

  public readonly order = signal<Order<Person>>({
    key: 'firstName',
    direction: 'asc',
  });

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
}
