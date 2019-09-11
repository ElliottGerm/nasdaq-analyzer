import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RawDataComponent } from './raw-data/raw-data.component';
import { IndustriesComponent } from './industries/industries.component';
import { SectorsComponent } from './sectors/sectors.component';
import { TenYearDataComponent } from './ten-year-data/ten-year-data.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ViewJsonComponent } from './view-json/view-json.component';
import { CompanyAnalysisComponent } from './company-analysis/company-analysis.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sectors', component: SectorsComponent },
  { path: 'industries', component: IndustriesComponent },
  { path: 'raw-data/:symbol', component: TenYearDataComponent },
  { path: 'raw-data', component: RawDataComponent },
  { path: 'search/:searchQuery', component: SearchResultsComponent },
  { path: 'jsonView/:symbol', component: ViewJsonComponent },
  { path: 'analysis/:symbol', component: CompanyAnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }