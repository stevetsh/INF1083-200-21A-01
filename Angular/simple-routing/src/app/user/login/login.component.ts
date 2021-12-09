import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User;

  public message: string = '';
  constructor(private userService: UserService) {
    this.user = {
      name: 'Davidson',
      username: 'davidson',
      password: '123456',
      age: 0
    };
  }

  login() {
    this.userService.login(this.user)
      .subscribe((resp) => {
        console.log('Successfully logged in');
        this.message = resp.msg;
      }, (err) => {
        console.error('Error logging in', err);
        this.message = err.error.msg;
      });
  }
}
