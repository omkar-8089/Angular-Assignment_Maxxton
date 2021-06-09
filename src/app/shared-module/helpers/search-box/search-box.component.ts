import { Component, EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Input() searchByKey: string;
  @Input() searchArray: any[];
  @Output() resultList: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor() { }
  searchDetails(searchString: string) {
    if (this.searchArray && this.searchArray.length) {
      this.resultList.emit(this.searchArray.filter(searchInp => searchInp[this.searchByKey].toLowerCase().includes(searchString.toLowerCase())));
    }
  }
}
