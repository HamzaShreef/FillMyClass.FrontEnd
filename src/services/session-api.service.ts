import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { AddSessionDTO, AddSessionResult, SessionResponse } from './../models/add-session-dto';
import { Observable, map, catchError } from 'rxjs';
import { ErrorMessageResolverService } from './error-message-resolver.service';
import { ValidationError } from '../models/validation-error';

@Injectable({
  providedIn: 'root'
})
export class SessionApiService {

  constructor(private _httpClient:HttpClient,private errorResolver:ErrorMessageResolverService) {

  }



  addSession(newSession: AddSessionDTO): Observable<AddSessionResult> {
    return this._httpClient
      .post<SessionResponse>(`${environment.baseApiUrl}/sessions`, newSession)
      .pipe(
        map((response) => ({
          isSucceeded: true,
          errorMessage: '',
        })),
        catchError((error) => {
          let errorMessage = 'An unexpected error occurred.';

          // Handle validation errors
          if (error.status === 400 && Array.isArray(error.error)) {
            const validationErrors: ValidationError[] = error.error;
            errorMessage = validationErrors[0].description;

            //errorMessage = this.errorResolver.resolveValidationMessage(validationErrors[0].code, 'en');
          }

          return [
            {
              isSucceeded: false,
              errorMessage,
            },
          ];
        })
      );
  }




}
