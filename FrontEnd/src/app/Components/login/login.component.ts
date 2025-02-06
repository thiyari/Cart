import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    
  display: boolean = false;
  email: any = "";
  otp_inputs: Array<string> = [];
  message: any = "";
  /*
  @ViewChild('success') successEle: any;
  @ViewChild('error') errorEle: any;

    */

  moveNext(event:any){
            // otp_num_4
            let current = event.target;
            let index = current.classList[1].slice(-1);

            // Shifting the key focus while pressing back space key (code 8)
            if (event.keyCode === 8 && index > 1) {
                current.previousElementSibling.focus()
            }
            // Shifting the key focus to next field while entering key
            else if (index < 4) {
                current.nextElementSibling.focus()
            }
            var otp_check = '';

            for (let num of this.otp_inputs) {
                otp_check += num
            }
            if (otp_check.length === 4) {
                console.log(otp_check)
                //verifyOTP()
            }

  }

  sendOTP() {
    /*
    let successEle = this.successEle.nativeElement;
    let errorEle = this.errorEle.nativeElement;
    */
    let regex = new RegExp('[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}');
    let email = this.email;
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
                            this.display = true;
                            this.message = "An email has been sent to ***" + email.slice(3)
                            this.email = ""
                        }
                        else {
                            //errorEle.style.display = 'block';
                            //errorEle.innerHTML = "Email not exist";
                            //successEle.style.display = 'none';
                        }
                    }
                )

        }
        else {
            //errorEle.style.display = 'block';
            //errorEle.innerHTML = "Invalid Email";
            //successEle.style.display = 'none';

        }

  }

}
