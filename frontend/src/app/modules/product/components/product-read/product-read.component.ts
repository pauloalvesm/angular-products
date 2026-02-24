import { ProductService } from './../../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product/Product';

@Component({
  selector: 'app-product-read',
  standalone: false,
  templateUrl: './product-read.component.html',
  styleUrl: './product-read.component.scss'
})
export class ProductReadComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
      console.log(products)
    });
  }

}
