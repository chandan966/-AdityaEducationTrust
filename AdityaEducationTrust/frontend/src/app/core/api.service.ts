import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { COLLEGES } from '../college-data';
import { College, Notice, EventItem, Enquiry } from '../models';
@Injectable({providedIn:'root'}) export class ApiService {
 private http=inject(HttpClient);
 colleges(): Observable<College[]> { return this.http.get<College[]>('/api/colleges').pipe(catchError(()=>of(COLLEGES))); }
 college(slug:string): Observable<College|null> { return this.http.get<College>(`/api/colleges/${encodeURIComponent(slug)}`).pipe(catchError(()=>of(COLLEGES.find(c=>c.slug===slug) ?? null))); }
 notices(): Observable<Notice[]> { return this.http.get<Notice[]>('/api/notices').pipe(catchError(()=>of([{id:1,title:'Admissions information',category:'Admissions',summary:'Contact the relevant college to confirm current admission dates and eligibility.',publishedAt:new Date().toISOString()}]))); }
 events(): Observable<EventItem[]> { return this.http.get<EventItem[]>('/api/events').pipe(catchError(()=>of([]))); }
 submitEnquiry(data:Enquiry): Observable<{message:string}> { return this.http.post<{message:string}>('/api/enquiries',data); }
 login(email:string,password:string): Observable<{token:string;user:{id:number;name:string;email:string;role:string}}> { return this.http.post<any>('/api/auth/login',{email,password}); }
}
