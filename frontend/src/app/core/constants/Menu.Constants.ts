import { GlobalConstants } from "./GlobalConstants";
import { APP_ROUTES } from "./app-routes";

export const MenuConstant = {
    menuItem: [
        {
            title: 'Medicine',
            icon: 'Medicine.svg',
            router: `/${APP_ROUTES.medicineMaster}`,
            roles: [GlobalConstants.ROLE.DOCTOR, GlobalConstants.ROLE.ADMIN]
        },
        // {
        //     title: 'prescription',
        //     icon: 'Prescription.svg',
        //     router: '/prescription',
        //     roles: [GlobalConstants.ROLE.DOCTOR,]
        // },
        {
            title: 'users',
            icon: 'fa fa-user',
            router: `/${APP_ROUTES.users}`,
            roles: [GlobalConstants.ROLE.DOCTOR, GlobalConstants.ROLE.RECEPTIONIST, GlobalConstants.ROLE.ADMIN]
        },
        {
            title: 'visits',
            icon: 'fa fa-user',
            router: `/${APP_ROUTES.visits}`,
            roles: [GlobalConstants.ROLE.DOCTOR, GlobalConstants.ROLE.RECEPTIONIST]
        }
    ]
}