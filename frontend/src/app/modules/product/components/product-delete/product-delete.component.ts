import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product/Product';
import { ProductService } from '../../../../core/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  standalone: false,
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.scss',
})
export class ProductDeleteComponent implements OnInit {
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
          this.productService.showMessage(
            'Error loading product for deletion!', true);
          this.router.navigate(['/products']);
        },
      });
    } else {
      this.productService.showMessage('ID not found in URL!', true);
      this.router.navigate(['/products']);
    }
  }

  deleteProduct(): void {
    const id = this.product.id;

    if (id) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.productService.showMessage('Product successfully deleted!');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.productService.showMessage(
            'Error deleting product. Try again!',
            true,
          );
          console.error(error);
        },
      });
    } else {
      this.productService.showMessage('Error: Product ID not found.', true);
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
