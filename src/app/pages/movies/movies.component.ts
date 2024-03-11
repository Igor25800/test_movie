import {Component, DestroyRef, OnInit} from '@angular/core';
import {MoviesService} from "../../shared/services/movies.service";
import {CardComponent} from "../../shared/components/card/card.component";
import {MoviesInterface} from "../../shared/interfaces/movies.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PaginationComponent} from "../../shared/components/pagination/pagination.component";
import {FilterComponent} from "../../shared/components/filter/filter.component";
import {FilterInterface} from "../../shared/interfaces/filter.interface";
import {ActivatedRoute} from "@angular/router";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CardComponent,
    PaginationComponent,
    FilterComponent,
    TitleCasePipe,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  itemsPerPage: number = 10;
  currentPage: number = 1;
  arrayMovies: Array<MoviesInterface> = [];
  arrayCopyMovies: Array<MoviesInterface> = [];
  arrayPageMovies: Array<MoviesInterface> = [];
  nameType!: string;

  constructor(
    private moviesService: MoviesService,
    private destroyRef: DestroyRef,
    private activeRouter: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.nameType = this.activeRouter.snapshot.url[0].path;
    this.moviesService.getMovies().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((res: {entries: Array<MoviesInterface>}) => {
      const array = res.entries.filter((el: MoviesInterface) => el.programType === this.nameType);
      this.arrayCopyMovies = array
      this.arrayMovies = array;
      this.arrayPageMovies = array;
      this.getPageItems(this.currentPage, this.itemsPerPage);
    })
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.getPageItems(page, this.itemsPerPage);
  }

  getPageItems(currentPage: number, itemsPerPage: number): void {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    this.arrayMovies = this.arrayPageMovies.slice(startIndex, endIndex);
  }

  eventFilter(filter: FilterInterface): void {
    const filteredArray = this.arrayCopyMovies.filter((el) => {
      let titleMatch = true;
      let dateMatch = true;
      if (filter.search) {
        titleMatch = el.title.toLowerCase().includes(filter.search.toLowerCase());
      }
      if (filter.start && filter.end) {
        dateMatch = el.releaseYear >= filter.start && el.releaseYear <= filter.end;
      }
      return titleMatch && dateMatch;
    });
    this.arrayMovies = filteredArray;
    this.arrayPageMovies = filteredArray;
    this.getPageItems(1, 10);
  }
}
