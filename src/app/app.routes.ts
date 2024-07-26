import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { LandingComponent } from './pages/component/landing/landing.component';
import { LoginComponent } from './pages/component/login/login.component';
import { LibrarianDashboardComponent } from './pages/component/librarian-dashboard/librarian-dashboard.component';
import { BookRecordComponent } from './pages/component/book-record/book-record.component';
import { RegisterStudentComponent } from './pages/component/register-student/register-student.component';
import { AddBookComponent } from './pages/component/add-book/add-book.component';
import { UpdateBookComponent } from './pages/component/update-book/update-book.component';
import { DeleteReservationsComponent } from './pages/component/delete-reservations/delete-reservations.component';
import { BorrowRecordComponent } from './pages/component/borrow-record/borrow-record.component';
import { ReservationRecordComponent } from './pages/component/reservation-record/reservation-record.component';
import { FineRecordComponent } from './pages/component/fine-record/fine-record.component';
import { UpdateStudentComponent } from './pages/component/update-student/update-student.component';
import { BorrowEditComponent } from './pages/component/borrow-edit/borrow-edit.component';
import { EditFineComponent } from './pages/component/edit-fine/edit-fine.component';
import { StudentDashboardComponent } from './pages/component/student-dashboard/student-dashboard.component';
import { StdProfileComponent } from './pages/component/std-profile/std-profile.component';
import { LibraryComponent } from './pages/component/library/library.component';

export const routes: Routes = [
    {
        path: '', redirectTo:'home', pathMatch:'full',
    },
    {
      path:'home', component: LandingComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    
    {path:'librarian-dashboard',component:LibrarianDashboardComponent,canActivate:[authGuard],
  children:[
    {path:'',component:BookRecordComponent},
    { path: 'register-student', component: RegisterStudentComponent },
    { path: 'books-record', component: BookRecordComponent},
    {path:'add-book', component:AddBookComponent},
    {path:'update-book/:id',component:UpdateBookComponent},
    {path:'delete-reservation/:id',component:DeleteReservationsComponent},
    { path: 'borrow-record', component: BorrowRecordComponent },
    { path: 'reservation-record', component: ReservationRecordComponent },
    { path: 'fine-record', component: FineRecordComponent },
    {path:'edit-borrow/:id', component:BorrowEditComponent},
    {path:'edit-fine/:id', component:EditFineComponent}

   

  ]},
   { path: 'student-dashboard', component: StudentDashboardComponent,canActivate:[authGuard],
          children: [
              {path:'',component:StdProfileComponent},
              { path: 'update-student', component: UpdateStudentComponent },
              {path:'profile' , component:StdProfileComponent},
              {path:'library', component:LibraryComponent}
             
            ],
          }
          

  ];
