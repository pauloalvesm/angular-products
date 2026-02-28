import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductUpdateComponent } from './product-update.component';
import { ProductService } from '../../../../core/services/product/product.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;

  const mockProduct = { id: 1, name: 'Monitor LED', price: 899.90 };

  const mockProductService = {
    readById: jest.fn(),
    update: jest.fn(),
    showMessage: jest.fn()
  };

  const mockRouter = {
    navigate: jest.fn()
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('1')
      }
    }
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    mockProductService.readById.mockReturnValue(of(mockProduct));

    await TestBed.configureTestingModule({
      declarations: [ProductUpdateComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load product data on initialization', () => {
    expect(mockProductService.readById).toHaveBeenCalledWith('1');
    expect(component.productForm.value).toEqual(mockProduct);
  });

  it('should update product and navigate on success', () => {
    mockProductService.update.mockReturnValue(of(mockProduct));

    component.updateProduct();

    expect(mockProductService.update).toHaveBeenCalled();
    expect(mockProductService.showMessage).toHaveBeenCalledWith('Product successfully updated!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should navigate back on cancel', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should handle error when loading product data (Negative - Load)', () => {
    mockProductService.readById.mockReturnValue(throwError(() => new Error('Load Error')));

    component.ngOnInit();

    expect(mockProductService.showMessage).toHaveBeenCalledWith('Error loading product data!', true);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should not call update if form is invalid (Negative - Validation)', () => {
    component.productForm.patchValue({ name: 'Ab' });

    component.updateProduct();

    expect(mockProductService.update).not.toHaveBeenCalled();
  });

  it('should show error message if update API fails (Negative - Update)', () => {
    mockProductService.update.mockReturnValue(throwError(() => new Error('Update Error')));

    component.updateProduct();

    expect(mockProductService.showMessage).toHaveBeenCalledWith('Error updating product!', true);
  });
});
