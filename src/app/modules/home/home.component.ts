import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  userDetail : any 


  ngOnInit() {
    var userDetailSession : any = sessionStorage.getItem("userDetail")
    this.userDetail = JSON.parse(userDetailSession)
  }

}
