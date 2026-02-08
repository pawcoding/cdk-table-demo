import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country',
})
export class CountryPipe implements PipeTransform {
  readonly #intl = new Intl.DisplayNames(['en'], { type: 'region' });

  public transform(countryCode: string): string {
    const countryName = this.#intl.of(countryCode) ?? countryCode;
    const flagEmoji = this.getFlagEmoji(countryCode);

    return `${flagEmoji} ${countryName}`;
  }

  private getFlagEmoji(countryCode: string): string {
    return String.fromCodePoint(
      ...countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0)),
    );
  }
}
