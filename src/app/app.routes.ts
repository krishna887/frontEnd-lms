import { Routes } from '@angular/router';
import { GetApiComponent } from './component/get-api/get-api.component';
import { FormComponent } from './component/form/form.component';
export const routes: Routes = [
    { path: 'get-api', component: GetApiComponent },
    { path: 'form-component', component: FormComponent },
];
