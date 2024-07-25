import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LandingComponent } from './component/landing/landing.component';
import { LibrarianDashboardComponent } from './component/librarian-dashboard/librarian-dashboard.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { BookRecordComponent } from './component/book-record/book-record.component';
import { RegisterStudentComponent } from './component/register-student/register-student.component';
import { BorrowRecordComponent } from './component/borrow-record/borrow-record.component';
import { FineRecordComponent } from './component/fine-record/fine-record.component';
import { UpdateStudentComponent } from './component/update-student/update-student.component';
import { ReservationRecordComponent } from './component/reservation-record/reservation-record.component';
import { AddBookComponent } from './component/add-book/add-book.component';
import { UpdateBookComponent } from './component/update-book/update-book.component';
import { DeleteReservationsComponent } from './component/delete-reservations/delete-reservations.component';
import { BorrowEditComponent } from './component/borrow-edit/borrow-edit.component';
import { EditFineComponent } from './component/edit-fine/edit-fine.component';
import { StdProfileComponent } from './component/std-profile/std-profile.component';
import { LibraryComponent } from './component/library/library.component';
import { authGuard } from './service/guard/auth.guard';

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
    { path: 'student-dashboard', component: StudentDashboardComponent},
    { path: 'update-student', component: UpdateStudentComponent },
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
