import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product/Product';
import { ProductService } from '../../../../core/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  standalone: false,
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss',
})
export class ProductUpdateComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.readById(id).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          this.productService.showMessage('Error loading product data!', true);
          this.router.navigate(['/products']);
        },
      });
    } else {
      this.productService.showMessage('ID not found in URL!', true);
      this.router.navigate(['/products']);
    }
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe({
      next: () => {
        this.productService.showMessage('Product successfully updated!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.productService.showMessage(
          'Error updating product. Try again!',
          true,
        );
        console.error(err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
