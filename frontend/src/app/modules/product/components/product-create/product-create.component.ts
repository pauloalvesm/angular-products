import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product/product.service';
import { Product } from '../../../../core/models/product/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../../shared/utils/validators/FormValidator';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
  };

  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  createProduct(): void {
    if (!FormValidator.validateAndNotify(this.productForm, this.productService)) {
      return;
    }

    this.productService.create(this.productForm.value).subscribe({
      next: () => {
        this.productService.showMessage('Product created successfully!');
        this.router.navigate(['/products']);
      },
      error: () => {
        this.productService.showMessage('An error occurred while creating the product!', true);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
