import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LandingComponent } from './component/landing/landing.component';
import { LibrarianDashboardComponent } from './component/librarian-dashboard/librarian-dashboard.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { BookRecordComponent } from './component/book-record/book-record.component';
import { RegisterStudentComponent } from './component/register-student/register-student.component';
import { BorrowRecordComponent } from './component/borrow-record/borrow-record.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { FineRecordComponent } from './component/fine-record/fine-record.component';
import { FineComponent } from './component/fine/fine.component';
import { BooksComponent } from './component/books/books.component';
import { UpdateStudentComponent } from './component/update-student/update-student.component';
import { ReservationRecordComponent } from './component/reservation-record/reservation-record.component';
import { BorrowComponent } from './component/borrow/borrow.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {path:'librarian-dashboard',component:LibrarianDashboardComponent,
  children:[
    { path: 'register-student', component: RegisterStudentComponent },
    { path: 'books-record', component: BookRecordComponent },
    { path: 'borrow-record', component: BorrowRecordComponent },
    { path: 'reservation-record', component: ReservationRecordComponent },
    { path: 'fine-record', component: FineRecordComponent },
    { path: 'student-dashboard', component: StudentDashboardComponent},
    { path: 'update-student', component: UpdateStudentComponent },

  ]},
   { path: 'student-dashboard', component: StudentDashboardComponent,
          children: [
              { path: 'update-student', component: UpdateStudentComponent },
              { path: 'books', component: BooksComponent },
              { path: 'borrow', component: BorrowComponent },
              { path: 'reservation', component: ReservationComponent },
              { path: 'fine', component: FineComponent },
            ]}
  ];
