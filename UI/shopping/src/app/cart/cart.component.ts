import {Component, OnInit} from '@angular/core';
import {Item} from '../shopping/shopping.component';
import {CartService, ItemInCart} from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  total = 0;
  emailInput: any;

  itemsInCart: Array<ItemInCart> = new Array<ItemInCart>();

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.initCartPage();
  }

  initCartPage() {
    this.total = this.cartService.total;
    this.itemsInCart = this.cartService.itemsInCart;
  }

  checkOut() {
    this.cartService.checkOut();
    console.log(this.emailInput);
    this.itemsInCart.length = 0;
    this.total = 0;
    if (this.emailInput !== '') {
      this.cartService.sendEmail(this.emailInput).subscribe(res => {console.log(res);
                                                                    });
    }
  }

  setTotal(num: number){
    this.total += num;
  }

  addItem(item: Item) {
    this.setTotal(item.price);
    return this.cartService.addItem(item.id);
  }

  removeItem(item: Item) {
    this.setTotal(-item.price);
    return this.cartService.removeItem(item.id);
  }

  getEmailInput(value: string) {
    this.emailInput = value;
  }
}
