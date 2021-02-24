import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { File } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  file = {} as File;

  private insertfile_url = 'http://localhost:3000/api/insertFile';
  private getAllfilesBlock1_url = 'http://localhost:3000/api/getAllFilesBlock1';
  private getAllfilesBlock2_url = 'http://localhost:3000/api/getAllFilesBlock2';
  private getAllfilesBlock3_url = 'http://localhost:3000/api/getAllFilesBlock3';
  private getAllfiles_url = 'http://localhost:3000/api/getAllfiles';
  private deleteFile_url = 'http://localhost:3000/api/deleteFile';

  constructor(private http: HttpClient) { }

  postFile(file: File): Promise<any> {
    return this.http
      .post<any>(this.insertfile_url, file)
      .toPromise();
  }

  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.getAllfiles_url);
  }

  getAllFilesBlock1(): Observable<File[]> {
    return this.http.get<File[]>(this.getAllfilesBlock1_url);
  }

  getAllFilesBlock2(): Observable<File[]> {
    return this.http.get<File[]>(this.getAllfilesBlock2_url);
  }

  getAllFilesBlock3(): Observable<File[]> {
    return this.http.get<File[]>(this.getAllfilesBlock3_url);
  }

  deleteFile(id: string) {
    return this.http.delete<File>(this.deleteFile_url + '/' + id);
  }
}
