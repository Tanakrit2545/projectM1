import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  // Define httpOptions for setting headers
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Role related methods
  getAllRole(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/role/getAll'));
  }

  saveRegister(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/register/save'), body, this.httpOptions);
  }

  authen(userName: any, password: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat(`/login/authen?userName=${userName}&password=${password}`));
  }

  updateProfile(data: any, userId: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat(`/register/update/${userId}`), body, this.httpOptions);
  }

  getByUserId(userId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat(`/register/getById?userId=${userId}`));
  }

  getAllUser(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/manage/user/getAllUser'));
  }

  deleteUserByUserId(userId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat(`/register/delete?userId=${userId}`));
  }

  getMotorcycleImgByMotorcycleId(motorcycleId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/motorcycle/getMotorcycleImgByMotorcycleId?motorcycleId=' + motorcycleId));
  }

  getThumbnail(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'    
    });
    return this.http.get<Blob>(API_ENDPOINT.concat(`/motorcycle/getThumbnailByte?fileName=${fileName}`), { headers: headers, responseType: 'blob' as 'json' });
  }
  loadProducts(): Observable<any[]> {
    return this.http.get<any[]>('/api/products');
  }

  deleteMotorcycle(motorcycleId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/motorcycle/delete?motorcycleId=' + motorcycleId));
  }

  getAllMotorcycle(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/motorcycle/getAll'));
  }

  getMotorcycleTypeAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/motorcycle/getMotorcycleTypeAll'));
  }

  saveImage(formData: FormData, motorcycleId: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.concat('/motorcycle/saveImage/' + motorcycleId), formData);
  }

  getMotorcycleByMotorcycleId(motorcycleId: string): Observable<any> {
    return this.http.get(API_ENDPOINT.concat(`/motorcycle/getById?motorcycleId=${motorcycleId}`));
  }

  updateMotorcycle(data: any, motorcycleId: string): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat(`/motorcycle/update/${motorcycleId}`), body, this.httpOptions);
  }

  deleteImage(fileName: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/motorcycle/deleteImgByFileName?fileName=' + fileName));
  }

  saveMotorcycle(newMotorcycle: any): Observable<any> {
    const body = JSON.stringify(newMotorcycle);
    return this.http.post<any>(API_ENDPOINT.concat('/motorcycle/save'), body, this.httpOptions);
  }


getImageByte(fileName: string): Observable<Blob> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  return this.http.get<Blob>(API_ENDPOINT.concat(`/motorcycle/getImageByte?fileName=${fileName}`), {
    headers: headers,
    responseType: 'blob' as 'json'
  });
}
}