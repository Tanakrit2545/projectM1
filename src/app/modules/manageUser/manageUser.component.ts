import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallserviceService } from '../services/callservice.service';

@Component({
  selector: 'app-manageUser',
  templateUrl: './manageUser.component.html',
  styleUrls: ['./manageUser.component.css']
})
export class ManageUserComponent implements OnInit {

  constructor(
    private callService: CallserviceService,
    private router: Router
  ) { }

  userList: any[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.callService.getAllUser().subscribe({
      next: (res: any) => {
        if (res.data) {
          this.userList = res.data;
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  onDeleteUser(userId: string) {
    if (userId) {
      this.callService.deleteUserByUserId(userId).subscribe({
        next: (res: any) => {
          console.log('User deleted successfully!', res);
          // Optionally, update the user list after deletion
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  onUpdateUser(userId: string) {
    if (userId) {
      this.router.navigate(['/profile', userId]);
    }
  }

}
