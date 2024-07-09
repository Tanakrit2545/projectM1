import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CallserviceService } from '../services/callservice.service';

const API_ENDPOINT = environment.API_ENDPOINT;

interface Motorcycle {
  id: number;
  motorcycleName: string;
  motorcycleDesc: string;
  price: number;
  status: string;
  image: string; // Fixing type for image property
  quantity?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {
  private motorcyclesSource = new BehaviorSubject<Motorcycle[]>([]);
  currentMotorcycles = this.motorcyclesSource.asObservable();

  constructor(private http: HttpClient, private callService: CallserviceService) {}

  addMotorcycle(motorcycle: Motorcycle) {
    const currentData = this.motorcyclesSource.value;
    this.motorcyclesSource.next(currentData.concat(motorcycle));
  }

  loadMotorcycles() {
    this.callService.getAllMotorcycle().subscribe(
      (motorcycles: Motorcycle[]) => {
        this.motorcyclesSource.next(motorcycles);
        console.log('Motorcycles loaded successfully!', motorcycles);
      },
      (error: any) => {
        console.error('Error loading motorcycles:', error);
      }
    );
  }
  
  // Methods related to motor images
  getMotorcycleImgByMotorcycleId(motorcycleId: string): Observable<any> {
    return this.http.get(API_ENDPOINT.concat(`/motorcycle/getMotorImgByMotorId?motorId=${motorcycleId}`));
  }

  getBlobThumbnail(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<Blob>(API_ENDPOINT.concat(`/motorcycle/getImageByte?fileName=${fileName}`), {
      headers: headers,
      responseType: 'blob' as 'json'
    });
  }

  // Methods related to motorcycles
  getAllMotorcycle(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/motorcycle/getAll'));
  }

  getMotorcycleTypeAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/motorcycle/getMotorTypeAll'));
  }

  saveImage(formData: FormData, motorcycleId: string): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.concat(`/motorcycle/saveImage/${motorcycleId}`), formData);
  }

  saveMotorcycle(data: any): Observable<any> {
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(API_ENDPOINT.concat('/motorcycle/save'), body, httpOptions);
  }

  removeImgByMotorcycleId(motorcycleId: string): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat(`/motorcycle/removeImgByMotorId?motorId=${motorcycleId}`));
  }

  deleteMotor(motorcycleId: string): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat(`/motorcycle/delete?motorId=${motorcycleId}`));
  }

  getMotorcycleByMotorId(motorcycleId: string): Observable<any> {
    return this.http.get(API_ENDPOINT.concat(`/motorcycle/getById?motorcycleId=${motorcycleId}`));
  }

  updateMotorcycle(data: any, motorcycleId: string): Observable<any> {
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(API_ENDPOINT.concat(`/motorcycle/update/${motorcycleId}`), body, httpOptions);
  }

  deleteMotorcycleImage(fileName: string): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat(`/motorcycle/deleteImgByFileName?fileName=${fileName}`));
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
