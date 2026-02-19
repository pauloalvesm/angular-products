import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProductComponent,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    ProductComponent,
    ProductCreateComponent
  ]
})
export class ProductModule { }
