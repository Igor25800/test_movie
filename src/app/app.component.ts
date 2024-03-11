import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header.component";
import {FilterComponent} from "./shared/components/filter/filter.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Moment} from "moment";
import {MatDatepicker, MatDatepickerToggle, MatDateRangeInput, MatDateRangePicker} from "@angular/material/datepicker";
import {MatFormField, MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FilterComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
