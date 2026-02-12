import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnOrderMenuComponent } from './column-order-menu.component';

describe('ColumnOrderMenuComponent', () => {
  let component: ColumnOrderMenuComponent;
  let fixture: ComponentFixture<ColumnOrderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnOrderMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnOrderMenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
