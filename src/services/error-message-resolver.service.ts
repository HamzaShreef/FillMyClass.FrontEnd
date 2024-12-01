import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageResolverService {
  constructor() {
  }


  resolveValidationMessage(code: string, lang: string): string {
    return '';
  }

}
