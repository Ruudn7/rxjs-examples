import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { Person } from './services/data-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hidden = true;
  person: Person = { firstName: '', lastName: '' };
  constructor(
    private dataService: DataService
  ) {}

  add(): void {
    this.dataService.addPerson(this.person);
  }
}
