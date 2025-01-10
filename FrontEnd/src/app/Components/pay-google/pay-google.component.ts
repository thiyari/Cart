import { Component, OnInit } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { LocalService } from '../../service/local.service';
import { ApiService } from '../../service/api.service';

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
    console.log(this.orderid)
    this.referenceid = this.localStore.getData("referenceid")
    console.log(this.referenceid)
    this.amount = this.localStore.getData("amount")
    console.log(this.amount)
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
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId'
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'Demo Merchant'
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
      orderid: this.orderid,
      referenceid: this.referenceid,
      amount: this.amount,
    }
    this.api.googlepay(data)
    return (
    window.location.href = `http://localhost:4200/googlepaytxn/${this.referenceid}`,
    this.localStore.clearData(),
    {
      transactionState: 'SUCCESS'
    });
  }

  onError = (event: ErrorEvent): void => {
    console.log("error", event.error);
  }
  
}
