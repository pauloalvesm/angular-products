import { FormGroup } from '@angular/forms';
import { ProductService } from '../../../core/services/product/product.service';

export class FormValidator {
  static validateAndNotify(form: FormGroup, productService: ProductService): boolean {
    if (form.invalid) {
      productService.showMessage('Please fill out all required fields!', true);

      form.markAllAsTouched();
      return false;
    }
    return true;
  }
}
