import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-chuck',
  templateUrl: './chuck.component.html',
  styleUrls: ['./chuck.component.scss']
})
export class ChuckComponent implements OnInit {
  categories: any;
  joke: any;
  jokes: any;

  displayedColumns = ['joke'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.http.get('https://api.chucknorris.io/jokes/categories').subscribe(categories => {
    this.categories = categories;
    });
    this.http.get('https://api.chucknorris.io/jokes/random').subscribe(joke => {
        this.joke = joke;
  });
  }
  onChange(category) {
    this.http.get('https://api.chucknorris.io/jokes/random?category=' + category).subscribe(joke => {
      this.joke = joke;
    });
  }
  randomJokes() {
    this.http.get('https://api.chucknorris.io/jokes/random').subscribe(joke => {
      this.joke = joke;
    });
  }

  onSearchChange(searchValue) {
    if (searchValue.length >= 3) {
        this.http.get('https://api.chucknorris.io/jokes/search?query=' + searchValue).subscribe(jokes => {
          this.jokes = jokes['result'];
          this.dataSource = new MatTableDataSource(jokes['result']);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      });
    }

  }

}
