import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product/product.service';
import { Product } from '../../../../core/models/product/Product';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: 'Product test',
    price: 125.98
  }

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {

  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Product created!');
    });
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
