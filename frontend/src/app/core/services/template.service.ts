import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchitectureType } from '../models/architecture-type.enum';
import { Observable } from 'rxjs';
import { Template } from '../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templateUrl = 'http://localhost:9000/api/template'

  constructor(private httpClient: HttpClient) { }

  downloadTemplate(id: string): Observable<Blob> {
    return this.httpClient.get(`${this.templateUrl}/${id}/download`, { responseType: 'blob' });
  }

  getTemplateByType(type: ArchitectureType): Observable<Template> {
    return this.httpClient.get<Template>(`${this.templateUrl}/type/${type}`);
  }
}
