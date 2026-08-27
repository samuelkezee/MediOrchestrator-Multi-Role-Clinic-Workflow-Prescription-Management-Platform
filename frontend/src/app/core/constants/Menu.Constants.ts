import { GlobalConstants } from "./GlobalConstants";

export const MenuConstant = {
    menuItem: [
        {
            title: 'Medicine',
            icon: 'Medicine.svg',
            router: '/medicine-master',
            roles: [GlobalConstants.ROLE.DOCTOR, GlobalConstants.ROLE.ADMIN]
        },
        {
            title: 'prescription',
            icon: 'Prescription.svg',
            router: '/prescription',
            roles: [GlobalConstants.ROLE.DOCTOR,]
        },
        {
            title: 'users',
            icon: 'fa fa-user',
            router: '/users',
            roles: [GlobalConstants.ROLE.DOCTOR, GlobalConstants.ROLE.RECEPTIONIST, GlobalConstants.ROLE.ADMIN]
        },
        {
            title: 'visits',
            icon: 'fa fa-user',
            router: '/visits',
            roles: [GlobalConstants.ROLE.DOCTOR, GlobalConstants.ROLE.RECEPTIONIST]
        }


    ]
}