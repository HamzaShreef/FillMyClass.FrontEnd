import { CommonModule } from '@angular/common';
import { Component, EventEmitter, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchQuery:string=''

  @Output()
  onSearch: EventEmitter<string>

  @Output()
  onFilter :EventEmitter<string>
  constructor(){
    this.onFilter = new EventEmitter();
    this.onSearch=new EventEmitter<string>();
  }

  submitSearchQuery(){
    this.onSearch.emit(this.searchQuery);
  }

  filterClick(){
    this.onFilter.emit();
  }

}
