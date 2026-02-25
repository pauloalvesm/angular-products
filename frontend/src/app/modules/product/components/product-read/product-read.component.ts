import { ProductService } from './../../../../core/services/product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../../core/models/product/Product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product-read',
  standalone: false,
  templateUrl: './product-read.component.html',
  styleUrl: './product-read.component.scss'
})
export class ProductReadComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>([]);
  displayedColumns = ['id', 'name', 'price', 'action'];
  filterText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(): void {
    this.filterText = '';
    this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
