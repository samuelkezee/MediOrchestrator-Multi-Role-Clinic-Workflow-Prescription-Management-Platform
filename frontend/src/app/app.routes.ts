import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Users } from './pages/users/users';
import { MedicinesMaster } from './pages/medicines-master/medicines-master';
import { authGuard } from './core/guards/auth.guard';
import { RegisterPatient } from './pages/patient/register-patient/register-patient';
import { PatientList } from './pages/patient/patient-list/patient-list';
import { Visits } from './pages/visits/visits';
import { OpenPatient } from './pages/open-patient/open-patient';
import { APP_ROUTES } from './core/constants/app-routes';
import { roleBasedAccessGuard } from './core/guards/role-based-access-guard';

export const routes: Routes = [
    {
        path: APP_ROUTES.root,
        redirectTo: APP_ROUTES.login,
        pathMatch: 'full'
    },
    {
        path: APP_ROUTES.login,
        component: Login
    },
    {
        path: APP_ROUTES.registerPatient,
        component: RegisterPatient
    },
    {
        path: APP_ROUTES.root,
        component: Layout,
        canActivate: [authGuard],
       
        children: [
            {
                path: APP_ROUTES.users,
                component: Users,
                canActivate: [roleBasedAccessGuard]
            },
            {
                path: APP_ROUTES.medicineMaster,
                component: MedicinesMaster,
                canActivate: [roleBasedAccessGuard]
            },
            {
                path: APP_ROUTES.patientList,
                component: PatientList,
                canActivate: [roleBasedAccessGuard]
            },
            {
                path: APP_ROUTES.visits,
                component: Visits,
                canActivate: [roleBasedAccessGuard]
            },
            {
                path: APP_ROUTES.openPatient,
                component: OpenPatient,
                canActivate: [roleBasedAccessGuard]
            }
            
        ]
    }
];

