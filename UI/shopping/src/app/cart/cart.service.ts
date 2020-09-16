import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../shopping/shopping.component';

export class ItemInCart {
  constructor(
    public id: number,
    public name: string,
    public summary: string,
    public image: string,
    public price: number,
    public stock: number,
    public count: number
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'http://localhost:8080';

  total = 0;

  itemsInCart: Array<ItemInCart> = new Array<ItemInCart>();


  constructor(private http: HttpClient) {
  }

  public checkOutApiRequest(id: number, count: number) {
    return this.http.put(`${this.url}/item/${id}/${count}`, null);
  }

  checkOut(){
    console.log(this.itemsInCart);
    // tslint:disable-next-line:typedef
    for (let _i = 0; _i < this.itemsInCart.length; _i++){
      this.checkOutApiRequest(this.itemsInCart[_i].id, this.itemsInCart[_i].count).subscribe(data => {console.log(data);
                                                                                                      this.itemsInCart.length = 0;
      });
    }
  }

  addItemToCart(item: Item) {
    if (this.itemsInCart.find(e => e.id === item.id)) {
      // console.log('already contain');
      for (let _i = 0; _i < this.itemsInCart.length; _i++){
        if (this.itemsInCart[_i].id === item.id){
          this.itemsInCart[_i].count += 1;
          // console.log('has ' + this.itemsInCart[_i].count + ' in cart');
        }
      }
    } else {
      // console.log('new item');
      const newItem = new ItemInCart(
        item.id,
        item.name,
        item.summary,
        item.image,
        item.price,
        item.stock,
        1
      );
      this.itemsInCart.push(newItem);
    }
    // console.log(this.itemsInCart);
    this.total += item.price;
    // console.log('total price is ' + this.total);
  }

  addItem(id: number) {
    for (var _i = 0; _i < this.itemsInCart.length; _i++){
      if (this.itemsInCart[_i].id === id) {
        this.itemsInCart[_i].count += 1;
      }
    }
  }

  removeItem(id: number) {
    for (var _i = 0; _i < this.itemsInCart.length; _i++){
      if (this.itemsInCart[_i].id === id) {
        this.itemsInCart[_i].count -= 1;
      }
    }
  }

  sendEmail(email: string) {
    // console.log(`${this.url}/shopping-cart/receipt/${email}`);
    return this.http.put(`${this.url}/shopping-cart/receipt/${email}`, null);
  }
}
