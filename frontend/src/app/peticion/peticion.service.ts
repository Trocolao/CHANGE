import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Peticion } from './peticion';
   
@Injectable({
  providedIn: 'root'
})
export class PeticionService {
   
  private apiURL = "http://127.0.0.1:8000/api/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Peticion[]> {
    return this.httpClient.get<Peticion[]>(this.apiURL + 'peticiones/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllByUser(): Observable<Peticion[]> {
    return this.httpClient.get<Peticion[]>(this.apiURL + 'mispeticiones/')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllFirmadas(): Observable<Peticion[]> {
    return this.httpClient.get<Peticion[]>(this.apiURL + 'peticionesfirmadas/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(post: FormData): Observable<Peticion> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<Peticion>(this.apiURL + 'peticiones/', post, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Peticion> {
    return this.httpClient.get<Peticion>(this.apiURL + 'peticiones/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, post: Peticion): Observable<Peticion> {
    return this.httpClient.put<Peticion>(this.apiURL + 'peticiones/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<Peticion>(this.apiURL + 'peticiones/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  firmar(id: Number) {
    return this.httpClient.put<Peticion>(this.apiURL + 'peticiones/firmar/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  puedeFirmar(id: Number) {
    return this.httpClient.get<boolean>(this.apiURL + 'peticiones/puede/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  cambiarEstado(id:Number){
    return this.httpClient.put<Peticion>(this.apiURL + 'peticiones/estado/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


  
}