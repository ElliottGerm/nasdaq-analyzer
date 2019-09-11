import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';//altered for testing
import { AppRoutingModule } from './app-routing.module';//nav bar links
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndustriesComponent } from './industries/industries.component';
import { SectorsComponent } from './sectors/sectors.component';
import { HomeComponent } from './home/home.component';
import { RawDataComponent } from './raw-data/raw-data.component';
import { CompanyInfoService } from './company-info.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ReactiveFormsModule } from '@angular/forms';

//infinite scroll
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//Font-Awesome
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, 
  MatFormFieldModule, MatInputModule } from '@angular/material';

//navbar searching
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//pagination
import {NgxPaginationModule} from 'ngx-pagination';
//Components
import { TenYearDataComponent } from './ten-year-data/ten-year-data.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ViewJsonComponent } from './view-json/view-json.component';
import { DataTableComponent } from './data-table/data-table.component';
import { SectorsBarChartComponent } from './sectors-bar-chart/sectors-bar-chart.component';
import { IndustriesBarChartComponent } from './industries-bar-chart/industries-bar-chart.component';
import { CompanyDataLineChartComponent } from './company-data-line-chart/company-data-line-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { CompanyAnalysisComponent } from './company-analysis/company-analysis.component';
import { TreeMapComponent } from './tree-map/tree-map.component';
import { ChartEnhancementsComponent } from './chart-enhancements/chart-enhancements.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    IndustriesComponent,
    SectorsComponent,
    RawDataComponent,
    TenYearDataComponent,
    LoadingSpinnerComponent,
    SearchResultsComponent,
    ViewJsonComponent,
    DataTableComponent,
    SectorsBarChartComponent,
    IndustriesBarChartComponent,
    CompanyDataLineChartComponent,
    StackedBarChartComponent,
    CompanyAnalysisComponent,
    TreeMapComponent,
    ChartEnhancementsComponent
  ],
  imports: [
    AppRoutingModule,
    // AngularFontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatIconModule,
    InfiniteScrollModule,
    BrowserModule,
    ScrollingModule,
    HttpClientModule,
    BrowserAnimationsModule,//nav bar links
    Ng2SearchPipeModule,//navbar searching
    NgxPaginationModule,//for pagination
    FormsModule, MatTableModule, MatPaginatorModule, 
    MatSortModule, ReactiveFormsModule//for searching, pagination, and sorting
  ],
  /*Added for testing */
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA//this fixed one thing...
  ],
  /*for testing*/
  exports: [
    NavbarComponent,
    LoadingSpinnerComponent,
  ],
  providers: [CompanyInfoService, SearchResultsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);//infinite scrolling