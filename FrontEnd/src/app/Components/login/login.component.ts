import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  @ViewChild('email') email: any;
  @ViewChild('verification') verfEle: any;
  @ViewChild('emailpartial') emailpartialEle: any;
  @ViewChild('success') successEle: any;
  @ViewChild('error') errorEle: any;


  sendOTP() {
    let emailEle = this.email.nativeElement;
    let verfEle = this.verfEle.nativeElement;
    let successEle = this.successEle.nativeElement;
    let errorEle = this.errorEle.nativeElement;
    let emailpartialEle = this.emailpartialEle.nativeElement;

    let regex = new RegExp('[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}');
    let email = emailEle.value;
    if (regex.test(email)) {
            fetch('http://localhost:8086/sendotp', {
                method: "POST",
                body: JSON.stringify({
                    "email": `${email}`
                }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(
                    (res) => {
                        if (res.status === 200) {
                            verfEle.style.display = 'block';
                            emailpartialEle.innerHTML = "***" + email.slice(3)
                            emailEle.value = ''
                        }
                        else {
                            errorEle.style.display = 'block';
                            errorEle.innerHTML = "Email not exist";
                            successEle.style.display = 'none';

                        }
                    }
                )

        }
        else {
            errorEle.style.display = 'block';
            errorEle.innerHTML = "Invalid Email";
            successEle.style.display = 'none';

        }

  }

}
