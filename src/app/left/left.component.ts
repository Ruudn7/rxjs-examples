import { DataService } from './../services/data.service';
import { Person } from './../services/data-base.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  subscription = new Subscription();

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const sub = this.dataService.behaviorSubject.subscribe(
      (data: Person[]) => {
        this.persons = data;
        console.log('Left Component Subscription');
      },
      error => console.log(error),
      () => console.log('Left complete?')
    );
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
