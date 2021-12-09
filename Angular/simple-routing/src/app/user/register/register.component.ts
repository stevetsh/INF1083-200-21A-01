import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public message: string = '';
  public user: User;

  constructor(private userService: UserService) {
    this.user = {
      name: 'Davidson',
      username: 'davidson',
      password: '123456',
      age: 0
    };
  }

  register() {
    //this.userService.register(this.username, this.password, this.name)
    let valid = false;

    if (this.user.age > 0) valid = true;
    if (this.user.name !== "" && this.user.name.length > 3 && this.user.name.length < 16) valid = valid && true;

    if (!valid) {
      this.message = "Le formulaire n'est pas valide";
      return;
    }

    this.userService.create(this.user)
      .subscribe((resp) => {
        console.log('Successfully registered');
        this.message = resp.msg;
      }, (err) => {
        console.error('Error registering', err);
        this.message = err.error.msg;
      });
  }
}
