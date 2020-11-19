import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../core/models/product';
import {map} from 'rxjs/operators';
import {COLOR_KEY, ID_KEY, NAME_KEY} from '../core/constants/global';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private jsonUrl = 'assets/products.json';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(response => {
        return response.products.map(productData => this.createProduct(productData));
      })
    );
  }

  private createProduct(productData: any): Product {
    return new Product(productData[ID_KEY], productData[NAME_KEY], productData[COLOR_KEY]);
  }
}
