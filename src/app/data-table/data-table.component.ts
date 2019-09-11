import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { CompanyInfoService } from '../company-info.service';
import { Router } from '@angular/router';


export interface CompanyInfo {
  symbol: string;
  name: string;
  market_cap: number;
  sector: string;
  industry: string;
  ipo_year: number;
}


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['symbol', 'name', 'ipo_year', 'market_cap', 'sector', 'industry'];
  dataSource: CompanyInfo[];
  sortedData: CompanyInfo[];
  listData: MatTableDataSource<any>;
  direction = 'asc';
  field = 'symbol';
  searchKey: string = "";

  ngOnInit() {
    this._companyInfoService.getCompanyInfo().subscribe(
      (data: any[]) => {
        this.dataSource = data;
        this.sortedData = data;
        this.listData = new MatTableDataSource(this.sortedData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
  }
  constructor(private _companyInfoService: CompanyInfoService, private router: Router) {
  }

  /*For routing to 10-year historical data page*/
  go210Year(i) {
    let symbol = JSON.stringify(i.symbol);
    symbol = symbol.substring(1, symbol.length - 1);
    this.router.navigate(["/raw-data", symbol]);
  }

  //function that searches entire table based on the string query
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toUpperCase();
  }

  sortCompanies(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name.toUpperCase(), b.name.toUpperCase(), isAsc);
        case 'symbol': return compare(a.symbol, b.symbol, isAsc);
        case 'ipo_year': return compare(+a.ipo_year, +b.ipo_year, isAsc);
        case 'market_cap': return compare(+a.market_cap, +b.market_cap, isAsc);
        case 'sector': return compare(a.sector, b.sector, isAsc);
        case 'industry': return compare(a.industry, b.industry, isAsc);
        default: this.listData = new MatTableDataSource(this.sortedData);
          return 0;
      }
    });

    function compare(a, b, isAsc) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

}
