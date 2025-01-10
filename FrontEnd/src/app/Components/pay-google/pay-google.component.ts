import { Component, OnInit } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay-google',
  imports: [GooglePayButtonModule],
  templateUrl: './pay-google.component.html',
  styleUrl: './pay-google.component.scss'
})
export class PayGoogleComponent implements OnInit{

  public amount: any;

  constructor(private api: ApiService, private route: ActivatedRoute){}
  
  ngOnInit(): void {

  }

  buttonWidth = 240
  
  paymentRequest: google.payments.api.PaymentDataRequest = {
    
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
      totalPrice: '100.00',
      currencyCode: 'INR',
      countryCode: 'IN'
    },
    callbackIntents: ["PAYMENT_AUTHORIZATION"]
  }

  onLoadPaymentData(event: Event): void {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log("load payment data", eventDetail.detail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (paymentData) => {
    console.log("payment authorized", paymentData);
    return {
      transactionState: 'SUCCESS'
    };
  }

  onError = (event: ErrorEvent): void => {
    console.log("error", event.error);
  }
  
}
