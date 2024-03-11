import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MoviesInterface} from "../../interfaces/movies.interface";


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() movies!: Array<MoviesInterface>;
  @Output() pageChanged = new EventEmitter<number>();
  itemsPerPage: number = 10;
  currentPage: number = 1;

  getTotalPages(): number {
    return Math.ceil(this.movies.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

   goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }

  nextPage(): void {
    const totalPages = this.getTotalPages();
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }
}
