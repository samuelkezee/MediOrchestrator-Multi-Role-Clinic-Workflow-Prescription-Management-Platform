import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Users } from './pages/users/users';
import { MedicinesMaster } from './pages/medicines-master/medicines-master';
import { authGuard } from './core/guards/auth.guard';
import { RegisterPatient } from './pages/patient/register-patient/register-patient';
import { PatientList } from './pages/patient/patient-list/patient-list';
import { Visits } from './pages/visits/visits';


// import { NoRoleAccess } from './pages/no-role-access/no-role-access';
import { OpenPatient } from './pages/open-patient/open-patient';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path:'register-patient', 
        component:RegisterPatient
    },
    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [
            {
                path: 'users',
                component: Users,
                // canActivate:[roleBasedAccessGuard],
            },
            {
                path: 'medicine-master',
                component: MedicinesMaster,
                // canActivate:[roleBasedAccessGuard],
            },{
                path: 'patient-list',
                component:PatientList,
                // canActivate:[roleBasedAccessGuard],
            },
            {
                path: 'visits',
                component:Visits,
                // canActivate:[roleBasedAccessGuard],
            },
            {
                path:'open-patient/:patientId',
                component:OpenPatient,
                // canActivate:[roleBasedAccessGuard]
            },
            // {
            //     path: 'no-role-access',
            //     component:NoRoleAccess
            // }
        ]
    }
];

