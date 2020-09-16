import { Component, OnInit } from '@angular/core';
import {ShoppingService} from './shopping.service';
import {CartService} from '../cart/cart.service';

export class Item {
  constructor(
    public id: number,
    public name: string,
    public summary: string,
    public image: string,
    public price: number,
    public stock: number,
    public soldCount: number = 0
  ) {
  }
}

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  public items: Item[];

  constructor(
    private shoppingService: ShoppingService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.initShopPage();
  }

  private initShopPage() {
    this.shoppingService.getAllItems().subscribe(
      res => {
        this.items = res;
        for (const item of this.items){
          item.soldCount = 0;
        }
        console.log(this.items);
      }
    );
  }

  // tslint:disable-next-line:typedef
  public sellItem(item: Item){
    item.soldCount++;
    this.cartService.addItemToCart(item);
  }
}
