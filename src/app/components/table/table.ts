import { CdkTableModule } from '@angular/cdk/table';
import { DatePipe } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { People } from '../../data-access/people';
import { ResourceDataSource } from '../../data-access/resource.data-source';
import { Person } from '../../types/person';
import { HeaderCell } from '../header-cell/header-cell';
import { COLUMNS } from '../../constants/columns';

@Component({
  selector: 'app-table',
  imports: [CdkTableModule, DatePipe, HeaderCell],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  readonly #people = inject(People);

  readonly #peopleRes = resource({
    loader: ({ abortSignal }) => this.#people.getPeople(abortSignal),
    defaultValue: [],
  });

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
    'country',
  ];

  protected readonly DATE_COLUMNS: Array<keyof Person> = ['createdAt', 'updatedAt'];

  public readonly COLUMNS = COLUMNS;

  protected readonly dataSource = new ResourceDataSource(this.#peopleRes);

  protected trackById(_: number, person: Person): string {
    return person.id;
  }
}
