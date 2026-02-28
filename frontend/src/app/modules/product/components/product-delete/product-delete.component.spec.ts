import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDeleteComponent } from './product-delete.component';
import { ProductService } from '../../../../core/services/product/product.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductDeleteComponent', () => {
  let component: ProductDeleteComponent;
  let fixture: ComponentFixture<ProductDeleteComponent>;

  const mockProduct = { id: '123', name: 'Teclado Mecânico', price: 250.0 };

  const mockProductService = {
    readById: jest.fn(),
    delete: jest.fn(),
    showMessage: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  const mockGetParam = jest.fn().mockReturnValue('123');
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: mockGetParam,
      },
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockGetParam.mockReturnValue('123');
    mockProductService.readById.mockReturnValue(of(mockProduct));

    await TestBed.configureTestingModule({
      declarations: [ProductDeleteComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load product data for confirmation on init', () => {
    fixture.detectChanges();
    expect(mockProductService.readById).toHaveBeenCalledWith('123');
    expect(component.product).toEqual(mockProduct);
  });

  it('should delete product and navigate to list on success', () => {
    fixture.detectChanges();
    mockProductService.delete.mockReturnValue(of({}));
    component.deleteProduct();

    expect(mockProductService.delete).toHaveBeenCalledWith('123');
    expect(mockProductService.showMessage).toHaveBeenCalledWith(
      'Product successfully deleted!',
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should handle error when ID is missing from URL (Negative - Route)', () => {
    mockGetParam.mockReturnValue(null);
    fixture.detectChanges();

    expect(mockProductService.showMessage).toHaveBeenCalledWith('ID not found in URL!', true);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should handle API error when loading the product (Negative - Load)', () => {
    mockProductService.readById.mockReturnValue(
      throwError(() => new Error('API Error')),
    );
    fixture.detectChanges();

    expect(mockProductService.showMessage).toHaveBeenCalledWith('Error loading product for deletion!', true);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should show error message if delete API fails (Negative - Delete)', () => {
    fixture.detectChanges();

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockProductService.delete.mockReturnValue(
      throwError(() => new Error('Delete Error')),
    );

    component.deleteProduct();

    expect(mockProductService.showMessage).toHaveBeenCalledWith('Error deleting product. Try again!', true);

    consoleSpy.mockRestore();
  });
});
