import {Component, DestroyRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import moment, {Moment} from "moment";
import { MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  @Output() eventFilter = new EventEmitter();
  @ViewChild('picker') datePicker!: MatDatepicker<Date>;
  filter: FormGroup =  new FormGroup({
    search: new FormControl(''),
    start:  new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private destroyRef: DestroyRef
  ) {
  }
  ngOnInit(): void {
    this.changeFilter();
  }

  changeFilter(): void {
    this.filter.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(res => {
      const filter = {...res, start: res.start ? res.start.toDate().getFullYear() : '',
        end: res.end ? res.end.toDate().getFullYear() : '' };
      this.eventFilter.emit(filter)
    })
  }

  setYear(selectedYear: Moment): void {
    const start = this.filter.value.start || moment();
    const end = this.filter.value.end || moment();
    if ( !this.filter.value.start ) {
      start.year(selectedYear.year());
      this.filter.controls['start'].setValue(start);
      this.datePicker.close();
      return;
    }
    if ( !this.filter.value.end ) {
      end.year(selectedYear.year());
      this.filter.controls['end'].setValue(end);
      this.datePicker.close();
      return ;
    }
    start.year(selectedYear.year());
    this.filter.controls['start'].setValue(start);
    this.filter.controls['end'].reset()
    this.datePicker.close();
  }
}
