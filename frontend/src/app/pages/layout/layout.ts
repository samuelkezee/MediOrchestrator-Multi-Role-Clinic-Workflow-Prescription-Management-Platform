import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NgClass, RouterOutlet, RouterLink, RouterLinkActive],
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
    sessionStorage.removeItem("hospitalUser");
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

  togglesidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }


}

