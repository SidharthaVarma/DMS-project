import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private apiUrl = 'http://localhost:5000/api/documents';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, formData, { headers: this.getHeaders() });
  }

  deleteDocument(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  searchDocuments(q: string) {
    const params = new HttpParams().set('q', q);
    return this.http.get<any[]>(`${this.apiUrl}/search`, { headers: this.getHeaders(), params });
  }

  getVersions(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/versions`, { headers: this.getHeaders() });
  }

  uploadNewVersion(id: string, formData: FormData) {
    return this.http.post(`${this.apiUrl}/${id}/new-version`, formData, { headers: this.getHeaders() });
  }

  updatePermissions(documentId: string, viewUsers: string[], editUsers: string[]) {
  return this.http.put(`${this.apiUrl}/${documentId}/permissions`, {
    view: viewUsers,
    edit: editUsers
  }, {
    headers: this.getHeaders()
  });
}

  getFileUrl(path: string): string {
    return `http://localhost:5000/${path.replace(/\\/g, '/')}`;
  }
}
