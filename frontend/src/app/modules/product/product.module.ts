import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardTitle, MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [
    ProductComponent,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatCardTitle,
    MatCardModule
],
  exports: [
    ProductComponent,
    ProductCreateComponent
  ]
})
export class ProductModule { }
