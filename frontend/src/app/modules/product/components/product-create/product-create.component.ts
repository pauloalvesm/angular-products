import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product/product.service';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {

  }

  createProduct(): void {
    this.productService.showMessage('Operation successfully completed');
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
