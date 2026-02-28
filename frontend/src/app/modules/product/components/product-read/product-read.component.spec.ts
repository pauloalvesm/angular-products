import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductReadComponent } from './product-read.component';
import { ProductService } from '../../../../core/services/product/product.service';
import { of, throwError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';

describe('ProductReadComponent', () => {
  let component: ProductReadComponent;
  let fixture: ComponentFixture<ProductReadComponent>;

  const mockProductService = {
    read: jest.fn(),
    showMessage: jest.fn()
  };

  const mockProducts = [
    { id: '1', name: 'Mechanical Keyboard', price: 250.50 },
    { id: '2', name: 'Gamer Mouse', price: 120.00 }
  ];

  beforeEach(async () => {
    mockProductService.read.mockReturnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      declarations: [ProductReadComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        FormsModule,
        NoopAnimationsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    expect(mockProductService.read).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should apply filter correctly', () => {
    const event = { target: { value: 'mouse' } } as any;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('mouse');
  });

  it('should clear filter and reset paginator page', () => {
    component.dataSource.paginator = component.paginator;

    const firstPageSpy = jest.spyOn(component.paginator, 'firstPage');

    component.filterText = 'search term';
    component.clearFilter();

    expect(component.filterText).toBe('');
    expect(firstPageSpy).toHaveBeenCalled();
  });

  it('should handle API error gracefully', () => {
    component.dataSource.data = [];
    mockProductService.read.mockReturnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(0);
  });

  it('should render currency in the table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('250');
    expect(compiled.textContent).toContain('120');
  });
});
