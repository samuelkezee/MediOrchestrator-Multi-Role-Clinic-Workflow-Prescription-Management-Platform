import { GlobalConstants } from "./GlobalConstants";

export const menuitems = [
    {
        title:'Medicine',
        icon:'Medicine.svg',
        router:'medicine-Master',
        roles:[GlobalConstants.ROLE.DOCTOR,GlobalConstants.ROLE.RECEPTIONIST]
    },
    {
        title:'prescription',
        icon:'Prescription.svg',
        router:'prescription',
        roles:[GlobalConstants.ROLE.DOCTOR]  
    },
    {
        title:'users',
        icon:'fa fa-user',
        router:'user',
        roles:[GlobalConstants.ROLE.DOCTOR,GlobalConstants.ROLE.RECEPTIONIST]
    }   


]