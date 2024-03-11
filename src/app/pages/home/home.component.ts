import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {arrayHome} from "../../shared/utils/date";
import {TypeInterface} from "../../shared/interfaces/type.interface";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  array: Array<TypeInterface> = arrayHome;

  constructor(private router: Router) { }

  navigateType(name: string): void {
    this.router.navigate([name.toLowerCase()]);
  }
}
