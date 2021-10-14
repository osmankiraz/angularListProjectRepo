import { element } from "protractor";
import { OdevService } from "./odev.service";
import { PersonModel } from "./personModel";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  templateUrl: "addForm.component.html",
  styleUrls:["./addForm.component.css"]
})
export class AddFormComponent implements OnInit, OnDestroy {
  // local storage den veri alabilmek için gerekli olan key
  private lsPropertyNameKey: string = "odevListArray";

  // behavior subject için gerekli olanlar
  modeSubs: Subscription;
  indexSubs: Subscription;
  mode: string;
  index: number;

  buttonName:string="Add"
  buttonClass:string="btn btn-primary  btn-lg btn-block"

  // propertiler
  name;
  university;
  department;
  isMarried;
  age;
  image;

  newPerson = new PersonModel();
  @ViewChild("dangerModal1") public dangerModal1: ModalDirective;

  constructor(private router: Router, private service: OdevService) {}
  ngOnInit(): void {
    // html binding işlemleri burada yapılır
    this.htmlBinding();

    // gelen mode verisinde burada abone olunur
    this.modeSubs = this.service.mode$.subscribe((modeRes) => {
      console.log("bana gelen mode degeri ", modeRes);
      this.mode = modeRes;
    });

    // gelen index verisine burada abone olunur
    this.indexSubs = this.service.currentIndex$.subscribe((indexRes) => {
      console.log("bana gelen current index değeri => ", indexRes);
      this.index = indexRes;
    });

    // mode verisine göre farklı işlemler yapılır
    if (this.mode === "update" ) {
      // mode update olduğunda initialize olacaklar
      this.loadPerson();
      this.buttonName="Update"
      this.buttonClass="btn btn-success  btn-lg btn-block"

    } else if(this.mode ==="view"){
      this.loadPerson();
      this.buttonName="Close"
      this.buttonClass="btn btn-warning  btn-lg btn-block"
      this.modeView()
    }
  }
  ngOnDestroy(): void {
    // component destroy edildiğinde abone işlemleri iptal edilir
    this.modeSubs.unsubscribe();
    this.indexSubs.unsubscribe();
  }

  onClickToActionButton() {
    if (this.mode === "add") {
      // form ekleme modunda iken çalışacaklar
      this.dangerModal1.show()
      // this.modeAdd();

    } else if (this.mode === "update") {
      // form update modunda iken çalışacaklar
      this.modeUpdate();
      this.router.navigateByUrl("odev");
    }else{
      this.router.navigateByUrl("odev");
    }


  }

  // eğer update veya view modu ile açılmış ise açılan indexe ait kullanıcı verilerini
  // gerekli inputlara doldurur
  loadPerson() {
    let personArray: Array<PersonModel> = [];
    // local storage de veri var onları al
    personArray = JSON.parse(localStorage.getItem(this.lsPropertyNameKey));
    // console.log("yazdır ......", personArray[this.index].department);
    this.name.value = personArray[this.index].name;
    this.university.value = personArray[this.index].university;
    this.department.value = personArray[this.index].department;
    this.isMarried.value = personArray[this.index].isMarried;
    this.age.value = Number(personArray[this.index].age);
  }

  // view modunda iken yapılacaklar
  modeView(){
    this.name.disabled=true
    this.university.disabled=true
    this.department.disabled=true
    this.isMarried.disabled=true
    this.age.disabled=true

  }

  // update modunda iken yapılacaklar
  modeUpdate() {
    let personArray: Array<PersonModel> = [];
    // local storage de veri var onları al
    personArray = JSON.parse(localStorage.getItem(this.lsPropertyNameKey));

    // local storageden alınan verileri yeni veriler ile değiştir
    personArray[this.index].name = this.name.value;
    personArray[this.index].university = this.university.value;
    personArray[this.index].department = this.department.value;
    personArray[this.index].isMarried = this.isMarried.value;
    personArray[this.index].age = this.age.value;

    localStorage.setItem(this.lsPropertyNameKey, JSON.stringify(personArray));
  }

  // add modunda iken yapılacaklar
  modeAdd() {
    let personArray: Array<PersonModel> = [];

    this.newPerson.name = this.name.value;
    this.newPerson.university = this.university.value;
    this.newPerson.department = this.department.value;
    this.newPerson.isMarried = (this.isMarried.value==='true');
    this.newPerson.age =parseInt( this.age.value);
    this.newPerson.image=this.image
    if (localStorage.getItem(this.lsPropertyNameKey)) {
      // local storage de veri var ise al ve ona push et
      personArray = JSON.parse(localStorage.getItem(this.lsPropertyNameKey));
      personArray.push(this.newPerson);
      localStorage.setItem(this.lsPropertyNameKey, JSON.stringify(personArray));
    } else {
      // local storagede hiç veri yok ise sıfırdan verileri yaz
      personArray.push(this.newPerson);
      localStorage.setItem(this.lsPropertyNameKey, JSON.stringify(personArray));
    }

    // işlem yapıldıktan sonra verileri sıfırlama
    (this.name.value = ""), (this.university.value = "");
    this.department.value = "";
    this.isMarried.value = "";
    this.age = null;
    this.router.navigateByUrl("odev");
  }

  htmlBinding() {
    this.name = document.getElementById("name") as HTMLInputElement;
    this.university = document.getElementById("university") as HTMLInputElement;
    this.department = document.getElementById("department") as HTMLInputElement;
    this.isMarried = document.getElementById("isMarried") as HTMLSelectElement;
    this.age = document.getElementById("age") as HTMLInputElement;
  }

  deneme(){
   this.dangerModal1.show()
  }
  spanclick(event){
    this.image=event
    console.log('name ',event);

  }
  personAddFinish(){
    this.dangerModal1.hide()
    this.modeAdd();
  }
}
