import { DataSource } from '@angular/cdk/table';
import { Resource } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

/**
 * Data source used to display items in a CDK table.
 * It listens to a resource that contains an array of items and emits the items as an observable stream to the table.
 */
export class ResourceDataSource<TItem> extends DataSource<TItem> {
  /**
   * Observable stream of items emitted by the resource.
   */
  readonly #items$: Observable<Array<TItem>>;

  constructor(resource: Resource<Array<TItem>>) {
    super();

    // Convert the resource's value to an observable stream
    this.#items$ = toObservable(resource.value);
  }

  public override connect(): Observable<Array<TItem>> {
    return this.#items$;
  }

  public override disconnect(): void {
    // No-op
  }
}
