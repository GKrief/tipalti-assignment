import { Component, OnInit } from '@angular/core';
import {Product} from '../../core/models/product';
import {ProductsService} from '../products.service';
import {first} from 'rxjs/operators';
import {MS_UNTIL_TIMEOUT} from '../../core/constants/global';

@Component({
  selector: 'app-products-screen',
  templateUrl: './products-screen.component.html',
  styleUrls: ['./products-screen.component.css']
})
export class ProductsScreenComponent implements OnInit {
  prodcuts$: Product[];
  checkBoxes: boolean[];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.getProducts().pipe(first()).subscribe(data => {
      this.prodcuts$ = data;
      this.prodcuts$.sort((a, b) => a.id > b.id ? 1 : -1);
      this.initStatusOfCheckboxes();
    });
  }

  private initStatusOfCheckboxes(): void {
    this.checkBoxes = Array(this.prodcuts$.length).fill(false);
    for (let i = 0; i < this.prodcuts$.length; i++) {
      this.checkBoxes[i] = localStorage.getItem(this.prodcuts$[i].id) ? true : false;
    }
  }

  onCheck($event: any, id: string): void {
    if ($event.currentTarget.checked) {
      this.mockApiCall(id).catch();
      localStorage.setItem(id, JSON.stringify(id));
    } else {
      localStorage.removeItem(id);
    }
  }

  private mockApiCall(id: string): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(() => console.log(id + ' checked!'), MS_UNTIL_TIMEOUT));
  }
}
