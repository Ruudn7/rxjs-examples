import { Person, DataBaseService } from './data-base.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  behaviorSubject = new BehaviorSubject<Person[]>([]);
  subject = new Subject<Person[]>();

  constructor(
    private dbService: DataBaseService
  ) {
    this.init();
  }

  addPerson(person: Person): void {
    this.dbService.addPerson(person).subscribe(this.observer());
  }

  private init(): void {
    this.dbService.fetchPersons().subscribe(this.observer());
  }

  private observer(): Observer<Person[]> {
    return {
      next: (persons: Person[]) => {
        this.behaviorSubject.next(persons);
        this.subject.next(persons);
      },
      error: error => console.log(error),
      complete: () => console.log('complete')
    };
  }
}
