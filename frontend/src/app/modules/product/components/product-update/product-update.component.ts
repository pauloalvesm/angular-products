import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product/Product';
import { ProductService } from '../../../../core/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../../shared/utils/validators/FormValidator';

@Component({
  selector: 'app-product-update',
  standalone: false,
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss',
})
export class ProductUpdateComponent implements OnInit {
  product!: Product;
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0.01)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.readById(id).subscribe({
        next: (product: Product) => {
          this.productForm.patchValue(product);
        },
        error: () => {
          this.productService.showMessage('Error loading product data!', true);
          this.router.navigate(['/products']);
        },
      });
    }
  }

  updateProduct(): void {
    if (!FormValidator.validateAndNotify(this.productForm, this.productService)) {
      return;
    }
    
    const updatedProduct: Product = this.productForm.value;

    this.productService.update(updatedProduct).subscribe({
      next: () => {
        this.productService.showMessage('Product successfully updated!');
        this.router.navigate(['/products']);
      },
      error: () => {
        this.productService.showMessage('Error updating product!', true);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
