import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://localhost:44356/api/Contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/${`GetAllContacts`}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || 'An unexpected error occurred.';
        return throwError(() => new Error(message));
      })
    );;
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${`GetContactById`}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || 'An unexpected error occurred.';
        return throwError(() => new Error(message));
      })
    );;
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/${`AddContact`}`, contact).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || 'An unexpected error occurred.';
        return throwError(() => new Error(message));
      })
    );
  }

  updateContact(contact: Contact): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${`UpdateContact`}`, contact).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || 'An unexpected error occurred.';
        return throwError(() => new Error(message));
      })
    );;
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${`DeleteContact`}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || 'An unexpected error occurred.';
        return throwError(() => new Error(message));
      })
    );;
  }
  
  searchContacts(query: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/Search?query=${query}`);
  }

  getSortedContacts(orderBy: string, ascending: boolean): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/Sort?orderBy=${orderBy}&ascending=${ascending}`);
  }

  getPaginatedContacts(page: number, pageSize: number): Observable<{ data: Contact[], hasNext: boolean }> {
    return this.http.get<{ data: Contact[], hasNext: boolean }>(`${this.apiUrl}/paginate?page=${page}&pageSize=${pageSize}`);
  }
}
