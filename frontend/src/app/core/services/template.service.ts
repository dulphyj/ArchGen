import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchitectureType } from '../models/architecture-type.enum';
import { Observable } from 'rxjs';
import { Template } from '../models/template.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templateUrl = `${environment.backendUrl}/api/template`;

  constructor(private httpClient: HttpClient) { }

  downloadTemplate(id: string): Observable<Blob> {
    console.log("llamando servicio descarga tempalte")
    return this.httpClient.get(`${this.templateUrl}/${id}/download`, { responseType: 'blob' });
  }

  getTemplateByType(type: ArchitectureType): Observable<Template> {
    console.log("llamando servicio gettemplate by type")
    return this.httpClient.get<Template>(`${this.templateUrl}/type/${type}`);
  }

  getTemplateById(id: string): Observable<Template> {
    console.log("llamando servicio get by id")
    return this.httpClient.get<Template>(`${this.templateUrl}/${id}`);
  }

  updateTemplate(id: string, template: Template, clerkId: string): Observable<Template> {
    console.log("llamando servicio update tempalte")
    return this.httpClient.put<Template>(`${this.templateUrl}/clone/${id}?clerkId=${clerkId}`, template);
  }

  getUserTemplates(clerkId: string): Observable<Template[]> {
    console.log("llamando servicio get template user")
    return this.httpClient.get<Template[]>(`${this.templateUrl}/user/${clerkId}`);
  }

  createTemplate(type: ArchitectureType, name: string, clerkId?: string): Observable<Template> {
    console.log("llamando servicio crear tempalte")
    const params: any = { type, name };
    if (clerkId) {
      params.clerkId = clerkId;
    }
    return this.httpClient.post<Template>(`${this.templateUrl}/generate`, null, { params })
  }

  deleteTemplate(id: string): Observable<any> {
    return this.httpClient.delete(`${this.templateUrl}/delete/${id}`)
  }
}
