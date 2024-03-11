import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MoviesInterface} from "../../interfaces/movies.interface";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
    @Input() card!: MoviesInterface;
}
