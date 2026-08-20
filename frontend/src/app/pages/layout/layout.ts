import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NgClass, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  isSidebarExpanded: boolean = true;
  loggedUserData: any;

  constructor(private router:Router) {
    const loggedData = sessionStorage.getItem("hospitalUser");
    if (loggedData && loggedData !== 'undefined' && loggedData !== 'null') {
      try {
        this.loggedUserData = JSON.parse(loggedData);
      } catch (e) {
        console.error("Error parsing loggedUserData from sessionStorage:", e);
      }
    }
  }

  onLogoff(){
    sessionStorage.removeItem("hospitalUser")
    this.router.navigateByUrl("/login")

  }

  togglesidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }


}
