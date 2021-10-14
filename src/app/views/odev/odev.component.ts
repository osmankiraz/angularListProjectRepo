import { OdevService } from "./odev.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PersonModel } from "./personModel";
import { ModalDirective } from "ngx-bootstrap/modal";
@Component({
  templateUrl: "odev.component.html",
})
export class OdevComponent implements OnInit {
  private lsPropertyNameKey: string = "odevListArray";

  clickedName:string
  clickedIndex:number

  peopleArray: Array<PersonModel> = [];

  @ViewChild("dangerModal") public dangerModal: ModalDirective;

  constructor(private router: Router, private service: OdevService) {}

  ngOnInit(): void {
    this.getPeopleData();
  }

  /**
   * local storageden verileri alıp componentteki arrayin içine atar
   */
  getPeopleData() {
    if (localStorage.getItem(this.lsPropertyNameKey)) {
      // hali hazırdaki verileri al
      this.peopleArray = JSON.parse(
        localStorage.getItem(this.lsPropertyNameKey)
      );
    } else {
      // hiç veri yok
      this.peopleArray = [];
    }
  }

  onClickDelete(index) {
    console.log("index yazdır = ", index);
    this.clickedIndex=index
    this.clickedName=this.peopleArray[index].name
    this.dangerModal.show()
  }

  deletePersonInConfirm(){
    this.peopleArray.splice(this.clickedIndex,1)
    localStorage.setItem(this.lsPropertyNameKey,JSON.stringify(this.peopleArray))
    this.dangerModal.hide()
  }
  onClickToForm(mode: string, index?: number) {
    // console.log('mode yazdır = ',mode);
    // console.log('index yazdır = ',index);
    this.service.updateMode(mode);
    this.service.updateIndex(index);
    this.router.navigateByUrl("form-detail");
  }
}
