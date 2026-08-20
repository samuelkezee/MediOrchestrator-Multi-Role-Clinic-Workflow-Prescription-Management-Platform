import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Users } from './pages/users/users';
import { MedicinesMaster } from './pages/medicines-master/medicines-master';

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
        path: '',
        component: Layout,
        children: [
            {
                path:'users',
                component:Users
                
            }
            ,{
                path:'medicine-master',
                component:MedicinesMaster
            }
        ]

    }
];
