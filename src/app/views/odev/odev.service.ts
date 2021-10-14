import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class OdevService {
  currentIndex: BehaviorSubject<number> = new BehaviorSubject(0);
  currentIndex$: Observable<number> = this.currentIndex.asObservable();

  mode: BehaviorSubject<string> = new BehaviorSubject("add");
  mode$: Observable<string> = this.mode.asObservable();

  constructor() {}

  updateIndex(enteredIndex) {
    this.currentIndex.next(enteredIndex);
  }
  updateMode(enteredMode) {
    this.mode.next(enteredMode);
  }
}
