import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  const mockRouter = {
    navigate: jest.fn()
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to products/create when navigateToProductCreate is called', () => {
    component.navigateToProductCreate();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['products/create']);
  });

  it('should call navigateToProductCreate when "New Product" button is clicked', () => {
    const spy = jest.spyOn(component, 'navigateToProductCreate');
    const button = fixture.debugElement.query(By.css('.info-button')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should have the "New Product" button rendered in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');

    expect(button).toBeTruthy();
    expect(button?.textContent).toContain('New Product');
  });

  it('should contain the product-read component in the template', () => {
    const productReadTag = fixture.debugElement.query(By.css('app-product-read'));

    expect(productReadTag).toBeTruthy();
  });
});
