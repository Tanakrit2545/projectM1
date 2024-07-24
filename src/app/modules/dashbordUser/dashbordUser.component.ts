import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbordUser',
  templateUrl: './dashbordUser.component.html',
  styleUrls: ['./dashbordUser.component.css']
})
export class DashbordUserComponent implements OnInit {

  constructor() { }

  userDetail : any 


  ngOnInit() {
    var userDetailSession : any = sessionStorage.getItem("userDetail")
    this.userDetail = JSON.parse(userDetailSession)
  }

}
