import { CanActivateFn } from '@angular/router';
import { MenuConstant } from '../constants/Menu.Constants';
import { inject } from '@angular/core';
import { Userservices } from '../services/userservices';

export const roleBasedAccessGuard: CanActivateFn = (route, state) => {
  
  const strArray=state.url.split('/');
  const routeName=strArray[1];
  const userService=inject(Userservices);


  const menuItem=MenuConstant.menuItem.find(item=>item.router==routeName);
  const isRoleExistInMenu=menuItem?.roles.includes(userService.loggedUserData.roleName)
  return true;

};
