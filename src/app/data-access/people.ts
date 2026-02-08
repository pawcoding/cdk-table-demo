import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Person } from '../types/person';
import { sleep } from '../utils/sleep';

@Injectable({
  providedIn: 'root',
})
export class People {
  readonly #people: Array<Person> = Array.from({ length: 500 }, () => this.createRandomPerson());

  public async getPeople(abortSignal: AbortSignal): Promise<Array<Person>> {
    // Simulate a delay to demonstrate the loading state
    await sleep(Math.random() * 3000, abortSignal);

    return this.#people.slice(0, 25);
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
      createdAt: faker.date.past(),
      updatedAt: faker.helpers.maybe(() => faker.date.recent()),
      avatarUrl: faker.image.personPortrait({ sex, size: 32 }),
      street: faker.location.streetAddress(true),
      city: faker.location.city(),
      zip: faker.location.zipCode('#####'),
      country: faker.location.country(),
    };
  }
}
