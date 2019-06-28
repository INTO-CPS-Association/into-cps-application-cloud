import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommunicationComponent} from '../communication/communication.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string = 'user';
  usernameInput: string = ''
  password: string = '';
  loggedIn = false;
  errorText = '';
  @Output() someEvent = new EventEmitter<string>();


  constructor(private communicationComponent: CommunicationComponent) {
  }

  ngOnInit() {
    //this.someEvent.next('success');
  }

  async login() {
    //check login
    const user = await this.communicationComponent.login(this.usernameInput, this.password);
    if (user !== null) {
      this.username = user;
      console.log('logged in as' + this.username)
      this.loggedIn = true;
      this.someEvent.next('success');
    }
  }
  async singup() {
    if (!this.isOkPass(this.password)) {
      this.errorText = 'Password should be minimum 8 characters long containing minimum 1 number, 1 special sign, 1 capital letter and 1 lowercase letter';
      return;
    }
    const user = await this.communicationComponent.signup(this.usernameInput, this.password);
    console.log(user)
    if (user !== null) {
      this.username = user;
      console.log('logged in as' + this.username)
      this.loggedIn = true;
      this.someEvent.next('success');
      return;
    } else {
      this.errorText = 'Failed to sign up on the given email and password';
    }
  }
  async forgottenPassword() {
    this.communicationComponent.forgottenPassword(this.usernameInput);
  }
  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isOkPass(password) {
    if (password.length < 7) {return false; }
    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    const validPassword = regExp.test(password);
    return validPassword;
  }
}
