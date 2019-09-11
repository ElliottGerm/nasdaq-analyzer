import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { CompanyInfoService } from '../company-info.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  validSearch: boolean = false;
  searchInput: string = "";
  options: any[] = [];//stores company for autocomplete feature
  searchResults: any[] = [];//stores the objects based off the search query

  buttonDisabled: boolean = false;
  timeLeft: number;// * 60;//Time in seconds
  displayedTime;//remaining time displayed to the user 

  public classes = {
    "btn": true,
    "btn-outline-primary": true,
    "tooltip": true,
    "disabled": true,
  }


  constructor(private router: Router, private SearchResultsComponent: SearchResultsComponent, private _companyInfoService: CompanyInfoService) { }

  ngOnInit() {
    this._companyInfoService.getCompanyInfo().subscribe(
      (data: any[]) => {
        this.options = data;
      }
    );
  }

  /**Kicks off data recollection upon button click.
   * Once clicked, a count down timer is triggered
   * and the button is disabled for 10 seconds.
   */
  recollectData() {

    if (!this.buttonDisabled) {
      this.displayedTime = '';    //ensures that the time doesnt display until its set porperly
      this.timeLeft = 10;         //resets the recollection time
      this.buttonDisabled = true; //disables the recollection button
      this.startTimer();
      // window.open('http://gocrawler-microservice.18.217.219.230.xip.io/crawl', "_blank");
      this._companyInfoService.goCrawl().subscribe();
    }
  }

  /**Starts a countdown timer for recollection button*/
  startTimer() {

    var interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.formatTime(this.timeLeft);//formats the time left into 00:00:00 format
        this.timeLeft--;
      } else {
        this.buttonDisabled = false;//enables the recollection button
        clearInterval(interval);    //clears the timer
      }
    }, 1000)
  }

  /**Formats the remaining time for recollection into 00:00:00 format */
  formatTime(value: number) {
    // const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    // this.displayedTime = ('00' + hours).slice(-2) + ':' 
    //                + ('00' + minutes).slice(-2) + ':' 
    //                + ('00' + Math.floor(value - minutes * 60)).slice(-2);
    this.displayedTime = ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }

  onNameKeyUp(event: any) {//logs user's input and stores it in userID variable

    this.searchInput = event.target.value;

    if (event.keyCode == 13) {
      if (this.searchInput.length == 0) {
        alert("Nothing Entered");
        return;
      }
      if (this.searchInput.length < 2) {
        alert("Enter at least 2 characters");
        return;
      }
      this.getSearchQuery();
    }

  }

  getSearchQuery() {
    if (this.searchInput.length == 0) {
      alert("Nothing Entered");
      return;
    }
    if (this.searchInput.length < 2) {
      alert("Enter at 2 least characters");
      return;
    }
    let currentURL = window.location.href;
    this.go2SearchResultsPage();
  }

  clickSearch() {
    if (this.searchInput.length == 0) {
      alert("Nothing Entered");
      return;
    }
    if (this.searchInput.length < 2) {
      alert("Enter at 2 least characters");
      return;
    }
    let currentURL = window.location.href;
    this.go2SearchResultsPage();
    this.go2SearchResultsPage();
  }


  go2SearchResultsPage() {

    this.router.navigate(["search/", this.searchInput]);//add the encoded JSON array to the URL
    let currentURL = window.location.href;
    if (currentURL.slice(22, 28).toUpperCase() === "search".toUpperCase()) {
      this.SearchResultsComponent.ngOnInit();
    }
  }



}

