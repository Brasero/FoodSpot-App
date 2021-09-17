import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  constructor(
    public router: Router, 
    public activate: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  moveToProduits() {

    this.router.navigateByUrl('tabs/gestion/stock/stockproduit');

  }

  moveToIngredients() {

    this.router.navigateByUrl('tabs/gestion/stock/stockingredient');

  }

  moveToCategories() {

    this.router.navigateByUrl('tabs/gestion/stock/gestion-categorie');

  }

}
