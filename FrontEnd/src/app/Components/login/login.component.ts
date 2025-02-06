import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
//export class LoginComponent implements AfterViewInit{
export class LoginComponent {
    
  display: boolean = false;
  email: any = "";
  otp_inputs: Array<any> = [];
  message: any = "";
  /*
  @ViewChild('email') email: any;
  @ViewChild('verification') verfEle: any;
  @ViewChild('emailpartial') emailpartialEle: any;
  @ViewChild('success') successEle: any;
  @ViewChild('error') errorEle: any;
  @ViewChildren('otp_num') otp_inputs!: QueryList<ElementRef>

  ngAfterViewInit() {
    this.otp_inputs.toArray();
  }
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
            /*
            for (let ip of this.otp_inputs) {
                otp_check += ip.nativeElement.value
            }*/
            for (let num of this.otp_inputs) {
                otp_check += String(num)
            }
            console.log(otp_check)
            if (otp_check.length === 4) {
                //verifyOTP()
            }

  }

  sendOTP() {
    /*
    let emailEle = this.email.nativeElement;
    let verfEle = this.verfEle.nativeElement;
    let successEle = this.successEle.nativeElement;
    let errorEle = this.errorEle.nativeElement;
    let emailpartialEle = this.emailpartialEle.nativeElement;
    */
    let regex = new RegExp('[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}');
    //let email = emailEle.value;
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
                            //verfEle.style.display = 'block';
                            this.display = true;
                            //emailpartialEle.innerHTML = "***" + email.slice(3)
                            this.message = "***" + email.slice(3)
                            //emailEle.value = ''
                            this.email = ""
                            /*this.otp_inputs.forEach((ip) => {
                                        ip.nativeElement.addEventListener('keyup', this.moveNext)
                                    })*/
                        }
                        else {
                            //errorEle.style.display = 'block';
                            this.display = true;
                            //errorEle.innerHTML = "Email not exist";
                            //successEle.style.display = 'none';
                        }
                    }
                )

        }
        else {
            this.display = true;
            //errorEle.style.display = 'block';
            //errorEle.innerHTML = "Invalid Email";
            //successEle.style.display = 'none';

        }

  }

}
