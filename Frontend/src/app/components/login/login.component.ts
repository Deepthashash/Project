import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { HomeComponent } from '../home/home.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private eventEmitterService: EventEmitterService,
    private authService: AuthService) { }

    tryLogin(formData): void {
      const x = this.authService.login(formData);
      console.log(x);
      x.then(
        (res) => {
          console.log(res);
          if (res.status) {
            // this.errorMessage = 'temp';

            this.eventEmitterService.onFirstComponentButtonClick();

            this.router.navigate(['/home']);
            console.log('success');
          } else {
            // this.errorMessage = res.error;
            this.toastrService.error('Insert correct user name and password','Wrong Credentials');
            console.log('error');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }

    getC(){
      console.log(this.authService.getCurrentUser());
    }

  ngOnInit(): void {
  }

}
