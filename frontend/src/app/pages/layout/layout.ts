import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MenuConstant} from '../../core/constants/Menu.Constants';
import { Userservices } from '../../core/services/userservices';
import { UserResponseModel } from '../../core/models/interfaces/User.Model';

@Component({
  selector: 'app-layout',
  imports: [NgClass, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  usrSrv=inject(Userservices);

  isSidebarExpanded: boolean = true;
  loggedUserData: UserResponseModel | null = null;
  menuItemList = MenuConstant.menuItem;
  //constant data cannot be used directly into HTML ,so create a variable


  constructor(private router:Router) {
    this.loggedUserData = this.usrSrv.getLoggedUser();
    const roleName = this.loggedUserData?.roleName?.trim().toLowerCase();
    this.menuItemList = roleName
      ? MenuConstant.menuItem.filter(menuItem =>
          menuItem.roles.some(role => role.toLowerCase() === roleName))
      : [];

  }

  onLogoff(){
    this.usrSrv.logout();
    this.router.navigateByUrl("/login");
  }

  togglesidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }


}

