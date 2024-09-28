import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  allNotification : any[]=[] ;
  userName : string | undefined ;
constructor(private router: Router, private service: userService) {
  this.userName = this.getUserNameFromLocalStorage();

}

ngOnInit(): void {
  this.getAllNotification();
}

getAllNotification(){
  this.service.getAllNotification().subscribe((res:any)=>{
    console.log(res);
    this.allNotification = res ;
  })
}

logout(): void {
  // Clear the user data from localStorage
  localStorage.removeItem('currentUser');
  this.router.navigate(['/auth/sign-in']);
}

getUserNameFromLocalStorage(){
  let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return currentUser?.username ;
}

getFirstLetter(userName: string): string {
  return userName ? userName.charAt(0).toUpperCase() : '';
}

deleteNotif(id: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this notification!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return this.service.deleteNotification(id).toPromise();
    },
    allowOutsideClick: () => !Swal.isLoading(),
  })
  .then((result) => {
    if (result.isConfirmed) {
      const res: any = result.value;
      if (res) {
        this.getAllNotification();
        Swal.fire('Deleted!', 'The notification has been deleted.', 'success');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'The notification deletion was cancelled.', 'info');
    }
  });
}
}
