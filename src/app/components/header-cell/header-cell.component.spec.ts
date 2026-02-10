import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderCellComponent } from './header-cell.component';

describe('HeaderCellComponent', () => {
  let component: HeaderCellComponent;
  let fixture: ComponentFixture<HeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCellComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
