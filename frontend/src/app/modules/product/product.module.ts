import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardTitle, MatCardModule } from "@angular/material/card";
import { ProductReadComponent } from './components/product-read/product-read.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductComponent,
    ProductCreateComponent,
    ProductReadComponent,
    ProductUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatCardTitle,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
],
  exports: [
    ProductComponent,
    ProductCreateComponent
  ]
})
export class ProductModule { }
