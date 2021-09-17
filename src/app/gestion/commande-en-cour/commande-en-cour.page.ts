import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from '../../models/products';
import { Ingredient } from '../../models/ingredients';
import { User } from '../../models/user';
import { Commande } from '../../models/commande';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from '../../services/local-storage.service';
import { DatabaseService } from '../../services/database.service';



@Component({
  selector: 'app-commande-en-cour',
  templateUrl: './commande-en-cour.page.html',
  styleUrls: ['./commande-en-cour.page.scss'],
})
export class CommandeEnCourPage implements OnInit {

  commandeList: BehaviorSubject<Commande[]>;

  constructor(
    private router: Router, 
    private activate: ActivatedRoute, 
    private storage: LocalStorageService,
    private bdd: DatabaseService
  ) { }

  ngOnInit() {

    this.bdd.getCommandeList().subscribe( (list) => {
      this.commandeList = new BehaviorSubject(list);
      console.log(this.commandeList);
    });

  }

  acceptCommande(nb: number) {

    this.bdd.acceptCommande(nb).subscribe( () => {

      this.bdd.getCommandeList().subscribe( (list) => {
        this.commandeList.next(list);

      });
    });

  }

  validateLivraison(nb: number) {

    this.bdd.validateLivraison(nb).subscribe( () => {

      this.bdd.getCommandeList().subscribe( (list) => {
        this.commandeList.next(list);
      });

    });

  }

  refuseCommande(nb: number) {

    this.bdd.refuseCommande(nb).subscribe( () => {

      this.bdd.getCommandeList().subscribe( (list) => {

        this.commandeList.next(list);

      });

    });
  }

}
