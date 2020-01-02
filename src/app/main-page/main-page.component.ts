import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showMenu(elem: HTMLElement) {
    elem.style.display = "none";
    document.getElementById("hide").style.display = "flex";
    const navigator = document.getElementById("navigator");
    navigator.style.display = "flex";
    navigator.scrollIntoView({ behavior: "smooth" });
  }

  hideMenu(elem: HTMLElement) {
    elem.style.display = "none";
    document.getElementById("show").style.display = "flex";
    document.getElementById("navigator").style.display = "none";
  }

}
