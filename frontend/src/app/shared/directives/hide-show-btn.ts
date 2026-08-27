import { Directive, ElementRef, inject, OnInit,Input } from '@angular/core';
import { Userservices } from '../../core/services/userservices';
import { GlobalConstants } from '../../core/constants/GlobalConstants';

@Directive({
  selector: '[appHideShowBtn]',
})
export class HideShowBtn {


  @Input() isHide=false;

  userSrv=inject(Userservices);
    constructor(private elementRef:ElementRef<HTMLElement>) {}
}
//   }
//   ngOnInit(): void {
//     if(this.userSrv.loggedUserData.data !== GlobalConstants.ROLE.RECEPTIONIST){
//       this.elementRef.nativeElement.style.display="none";
//     }
//   }
// }
