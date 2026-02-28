import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCreateComponent } from './product-create.component';
import { ProductService } from '../../../../core/services/product/product.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;

  const mockProductService = {
    create: jest.fn(),
    showMessage: jest.fn()
  };

  const mockRouter = {
    navigate: jest.fn()
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      declarations: [ProductCreateComponent],
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
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('price')?.value).toBeNull();
  });

  it('should call create and navigate on success', () => {
    const productData = { name: 'New Tablet', price: 1500.00 };
    component.productForm.setValue(productData);
    mockProductService.create.mockReturnValue(of({}));

    component.createProduct();

    expect(mockProductService.create).toHaveBeenCalledWith(productData);
    expect(mockProductService.showMessage).toHaveBeenCalledWith('Product created successfully!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should navigate back to products on cancel', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should not call service if form is invalid (Negative - Local Validation)', () => {
    component.productForm.setValue({ name: 'Ab', price: 0 });

    component.createProduct();

    expect(mockProductService.create).not.toHaveBeenCalled();
  });

  it('should show error message if API fails (Negative - Server Error)', () => {
    component.productForm.setValue({ name: 'Valid Product', price: 100 });
    mockProductService.create.mockReturnValue(throwError(() => new Error('Server Error')));

    component.createProduct();

    expect(mockProductService.showMessage).toHaveBeenCalledWith('An error occurred while creating the product!', true);
  });

  it('should validate name as required', () => {
    const nameControl = component.productForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.hasError('required')).toBeTruthy();
  });

  it('should validate price minimum value', () => {
    const priceControl = component.productForm.get('price');
    priceControl?.setValue(0);
    expect(priceControl?.hasError('min')).toBeTruthy();
  });
});
