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
  success: any = "";
  error: any = "";
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
            var otp_check = ""
            for (let num of this.otp_inputs) {
                otp_check += num
            }
            if (otp_check.length === 4) {
                this.verifyOTP(otp_check)
            }

  }

  verifyOTP(otp_check:any){
    fetch('http://localhost:8086/verify',
        {
            method: "POST",
            body: JSON.stringify({
                "email": `${this.email}`,
                "otp": `${otp_check}`
            }),
            headers: { 'Content-Type': 'application/json' }
        }
    )
        .then(
            (res) => {
                console.log(res)
                if (res.status == 200) {
                    this.display = false;
                    this.email = "";
                    this.success = "OTP verified Successfully";
                    this.error = "";
                }
                else {
                    this.display = false;
                    this.email = "";
                    this.error = "Invalid OTP, Please try again...";
                    this.success = "";
                }
            }
        )
  }

  sendOTP() {
    this.success = "";
    this.error = "";
    this.otp_inputs = [];
    let regex = new RegExp('[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (regex.test(this.email)) {
            fetch('http://localhost:8086/sendotp', {
                method: "POST",
                body: JSON.stringify({
                    "email": `${this.email}`
                }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(
                    (res) => {
                        if (res.status === 200) {
                            this.display = true;
                            this.message = "An email has been sent to ***" + this.email.slice(3)
                        }
                        else {
                            this.error = "Email not exist";
                            this.success = "";
                        }
                    }
                )

        }
        else {
            this.error = "Invalid Email";
            this.success = "";
        }
  }

}
