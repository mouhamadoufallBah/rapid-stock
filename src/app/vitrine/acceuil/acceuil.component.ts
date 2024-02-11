import { Component } from '@angular/core';
import { ProduitService } from '../../services/produit/produit.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {

}
