import { Component, OnInit } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { LocalService } from '../../service/local.service';
import { ApiService } from '../../service/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pay-google',
  imports: [GooglePayButtonModule],
  templateUrl: './pay-google.component.html',
  styleUrl: './pay-google.component.scss'
})
export class PayGoogleComponent implements OnInit{

  public orderid: any;
  public referenceid: any;
  public amount: any;
  paymentRequest!: google.payments.api.PaymentDataRequest;

  constructor(
    private api: ApiService,
    private localStore: LocalService
  ){}
  
  ngOnInit(): void {
    this.orderid = this.localStore.getData("orderid")
    this.referenceid = this.localStore.getData("referenceid")
    this.amount = this.localStore.getData("amount")
    this.localStore.clearData()
    this.paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: environment.GOOGLE_PAY_GATEWAY,
              gatewayMerchantId: environment.GOOGLE_PAY_GATEWAY_MERCHANT_ID
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: environment.GOOGLE_PAY_MERCHANT_ID,
        merchantName: environment.GOOGLE_PAY_MERCHANT_NAME
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: this.amount,
        currencyCode: 'INR',
        countryCode: 'IN'
      },
      callbackIntents: ["PAYMENT_AUTHORIZATION"]
    }
  }

  buttonWidth = 240

  onLoadPaymentData(event: Event): void {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log("load payment data", eventDetail.detail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (paymentData) => {
    console.log("payment authorized", paymentData);
    let data = {
      referenceid: this.referenceid,
      amount: this.amount,
    }
    this.api.googlepay(data)
    return (
    window.location.href = `${environment.CLIENT_URI}/googlepaytxn/${this.referenceid}`,
    {
      transactionState: 'SUCCESS'
    });
  }

  onError = (event: ErrorEvent): void => {
    console.log("error", event.error);
  }
  
}
