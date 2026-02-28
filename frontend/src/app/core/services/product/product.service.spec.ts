import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models/product/Product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let snackBarSpy: jest.Mocked<MatSnackBar>;

  const mockProduct: Product = { id: '1', name: 'Notebook', price: 4500.00 };
  const baseUrl = 'http://localhost:3001/products';

  beforeEach(() => {
    const snackSpy = {
      open: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: MatSnackBar, useValue: snackSpy }
      ]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    snackBarSpy = TestBed.inject(MatSnackBar) as jest.Mocked<MatSnackBar>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snackBar.open with correct parameters (Success)', () => {
    service.showMessage('Success Message');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Success Message',
      'X',
      expect.objectContaining({ panelClass: ['msg-success'] })
    );
  });

  it('should apply error class when isError is true', () => {
    service.showMessage('Error Message', true);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Error Message',
      'X',
      expect.objectContaining({ panelClass: ['msg-error'] })
    );
  });

  it('should fetch all products (READ)', () => {
    const mockProducts: Product[] = [mockProduct];
    service.read().subscribe(products => expect(products).toEqual(mockProducts));
    const req = httpMock.expectOne(baseUrl);
    req.flush(mockProducts);
  });

  it('should fetch product by ID', () => {
    service.readById('1').subscribe(p => expect(p).toEqual(mockProduct));
    const req = httpMock.expectOne(`${baseUrl}/1`);
    req.flush(mockProduct);
  });

  it('should create a new product (POST)', () => {
    const newP = { name: 'Monitor', price: 1200 };
    service.create(newP).subscribe(p => expect(p.id).toBe('10'));
    const req = httpMock.expectOne(baseUrl);
    req.flush({ ...newP, id: '10' });
  });

  it('should update a product (PUT)', () => {
    service.update(mockProduct).subscribe(p => expect(p).toEqual(mockProduct));
    const req = httpMock.expectOne(`${baseUrl}/${mockProduct.id}`);
    req.flush(mockProduct);
  });

  it('should delete a product (DELETE)', () => {
    service.delete('1').subscribe();
    const req = httpMock.expectOne(`${baseUrl}/1`);
    req.flush({});
  });
});
