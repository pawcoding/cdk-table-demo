import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Order } from '../types/order';
import { Pagination } from '../types/pagination';
import { Person } from '../types/person';
import { sleep } from '../utils/sleep';

export type Params<TItem> = {
  order: Order<TItem>;
  pagination: Pagination;
};

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  readonly #people: Array<Person> = Array.from({ length: 500 }, () => this.createRandomPerson());

  public async getPeople(abortSignal: AbortSignal, params: Params<Person>): Promise<Array<Person>> {
    // Simulate a delay to demonstrate the loading state
    await sleep(Math.random() * params.pagination.pageSize * 20, abortSignal);

    return this.#people
      .toSorted((a, b) => {
        const aValue = a[params.order.key];
        const bValue = b[params.order.key];

        if (aValue === bValue) {
          return 0;
        }

        const comparison = aValue > bValue ? 1 : -1;
        return params.order.direction === 'asc' ? comparison : -comparison;
      })
      .slice(
        params.pagination.pageIndex * params.pagination.pageSize,
        (params.pagination.pageIndex + 1) * params.pagination.pageSize,
      );
  }

  private createRandomPerson(): Person {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    const domain = faker.internet.domainName();

    return {
      id: faker.string.uuid(),
      firstName: firstName,
      lastName: lastName,
      jobTitle: faker.person.jobTitle(),
      website: domain,
      email: faker.internet.email({ firstName, lastName, provider: domain }).toLowerCase(),
      phone: faker.phone.number({ style: 'international' }),
      company: faker.company.name(),
      createdAt: faker.date.past({ years: 10 }),
      updatedAt: faker.date.recent({ days: 90 }),
      avatarUrl: faker.image.personPortrait({ sex, size: 32 }),
      street: faker.location.streetAddress(true),
      city: faker.location.city(),
      zip: faker.location.zipCode('#####'),
      country: faker.location.countryCode('alpha-2'),
    };
  }
}
