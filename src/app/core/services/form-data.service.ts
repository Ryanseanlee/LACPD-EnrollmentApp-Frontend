import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * This class is responsible for transferring form data
 * between components;
 */
export class FormDataService {
  public formData: any;
}
