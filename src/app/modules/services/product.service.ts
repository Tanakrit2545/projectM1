import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getBlobThumbnail(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'    
    });
    return this.http.get<Blob>(API_ENDPOINT.concat(`/product/getImageByte?fileName=${fileName}`), { headers: headers, responseType: 'blob' as 'json' });
  }

  getAllProduct(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getAll'));
  }

  getProductTypeAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getProductTypeAll'));
  }

  saveImage(formData: FormData, productId: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.concat(`/product/saveImage/${productId}`), formData);
  }

  saveProduct(data: any): Observable<any> {
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(API_ENDPOINT.concat('/product/save'), body, httpOptions);
  }

  removeImgByProductId(productId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat(`/product/removeImgByProductId?productId=${productId}`));
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat(`/product/delete?productId=${productId}`));
  }

  getProductByProductId(productId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat(`/product/getById?productId=${productId}`));
  }

  updateProduct(data: any, productId: any): Observable<any> {
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(API_ENDPOINT.concat(`/product/update/${productId}`), body, httpOptions);
  }

  deleteImage(fileName: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat(`/product/deleteImgByFileName?fileName=${fileName}`));
  }

  getProductImgByProductId(productId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat(`/product/getProductImgByProductId?productId=${productId}`));
  }

  getImageByte(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'    
    });
    return this.http.get<Blob>(API_ENDPOINT.concat(`/product/getImageByte?fileName=${fileName}`), { headers: headers, responseType: 'blob' as 'json' });
  }
  getImage(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'    
    });
    return this.http.get<Blob>(API_ENDPOINT.concat(`/product/getImageByte?fileName=${fileName}`), { headers: headers, responseType: 'blob' as 'json' });
  }

  getThumbnail(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'    
    });
    return this.http.get<Blob>(API_ENDPOINT.concat(`/product/getThumbnailByte?fileName=${fileName}`), { headers: headers, responseType: 'blob' as 'json' });
  }
  loadProducts(): Observable<any[]> {
    return this.http.get<any[]>('/api/products');
  }
  
}

 