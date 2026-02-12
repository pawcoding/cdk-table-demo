import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIconComponent } from '@ng-icons/core';
import { heroXMarkMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-side-sheet',
  imports: [NgIconComponent, CdkTrapFocus],
  templateUrl: './side-sheet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideSheetComponent {
  readonly #overlay = inject(Overlay);
  readonly #viewContainerRef = inject(ViewContainerRef);

  protected readonly ICONS = {
    close: heroXMarkMini,
  } as const;

  public readonly isOpen = model.required<boolean>();

  public readonly label = input.required<string>();

  public readonly description = input.required<string>();

  readonly #overlayRef: OverlayRef;

  protected readonly sideSheetTemplate = viewChild.required<TemplateRef<void>>('sideSheetTemplate');

  protected readonly sideSheetPortal = computed(
    () => new TemplatePortal(this.sideSheetTemplate(), this.#viewContainerRef),
  );

  constructor() {
    this.#overlayRef = this.#overlay.create({
      positionStrategy: this.#overlay.position().global().right('0').top('0'),
      scrollStrategy: this.#overlay.scrollStrategies.block(),
      height: '100%',
      maxWidth: '25rem',
      width: '90%',
      backdropClass: ['bg-neutral-900/50', 'dark:backdrop-blur-sm'],
      hasBackdrop: true,
    });
    this.#overlayRef
      .outsidePointerEvents()
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.isOpen.set(false));

    let timeout: ReturnType<typeof setTimeout> | undefined;
    effect((onCleanup) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      if (this.isOpen()) {
        this.#overlayRef.detach();
        this.#overlayRef.attach(this.sideSheetPortal());
      } else {
        timeout = setTimeout(() => {
          this.#overlayRef.detach();
        }, 300);
      }

      onCleanup(() => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
      });
    });
  }
}
