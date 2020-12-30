import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images = [
    {path: '../../../assets/images/construction-site-1.jpg'},
    {path: '../../../assets/images/construction-site-2.jpg'},
    {path: '../../../assets/images/construction-site-3.jpg'}
  ]

  sayHello(){
    console.log("hello");
  }

}
