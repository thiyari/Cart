import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { environment } from '../environments/environment';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  { 
    path:'dollar-factor',  
    renderMode: RenderMode.Prerender
  },
  {
    path:'products',     
    renderMode: RenderMode.Prerender
  },
  {
    path:'cart',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'prodreg',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'login',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'admin',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'orders',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'googlepay',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'prods',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'new-admin',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'admins-panel',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'admin-orders',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'pending-orders',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'user-orders',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'user-requests',    
    renderMode: RenderMode.Prerender
  },
  {
    path:'edit-admin/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const admins_list = await fetch(`${environment.SERVER_URI}/api/admins`)
      const admins_response = await admins_list.json()
      const admins_ids = admins_response.records.map((x:any)=>x._id)
      return admins_ids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'viewrequest/:orderid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const viewrequest_list = await fetch(`${environment.SERVER_URI}/api/orders`)
      const viewrequest_response = await viewrequest_list.json()
      const viewrequest_orderids = viewrequest_response.records.map((x:any)=>x.orderid)
      return viewrequest_orderids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'phonepetxn/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const phonepe_list = await fetch(`${environment.SERVER_URI}/api/phonepetxn`)
      const phonepe_response = await phonepe_list.json()
      const phonepe_referenceids = phonepe_response.records.map((x:any)=>x.referenceid)
      return phonepe_referenceids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'googlepaytxn/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const googlepay_list = await fetch(`${environment.SERVER_URI}/api/googlepaytxn`)
      const googlepay_response = await googlepay_list.json()
      const googlepay_referenceids = googlepay_response.records.map((x:any)=>x.referenceid)
      return googlepay_referenceids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'paypaltxn/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const paypal_list = await fetch(`${environment.SERVER_URI}/api/paypaltxn`)
      const paypal_response = await paypal_list.json()
      const paypal_referenceids = paypal_response.records.map((x:any)=>x.referenceid)
      return paypal_referenceids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'razorpaytxn/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const razorpay_list = await fetch(`${environment.SERVER_URI}/api/razorpaytxn`)
      const razorpay_response = await razorpay_list.json()
      const razorpay_referenceids = razorpay_response.records.map((x:any)=>x.referenceid)
      return razorpay_referenceids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'product/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const products_list = await fetch(`${environment.SERVER_URI}/api/products`)
      const products_response = await products_list.json()
      const product_pids = products_response.records.map((x:any)=>x.pid)
      return product_pids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'payment/:orderid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const orders_list = await fetch(`${environment.SERVER_URI}/api/orders`)
      const orders_response = await orders_list.json()
      const paymment_orders = orders_response.records.map((x:any)=>x.orderid)
      return paymment_orders
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'paypal',
    renderMode: RenderMode.Prerender
  },
  {
    path:'view-order/:orderid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const orders_list = await fetch(`${environment.SERVER_URI}/api/orders`)
      const orders_response = await orders_list.json()
      const view_orders = orders_response.records.map((x:any)=>x.orderid)
      return view_orders
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'view-order-delivery/:orderid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const orders_list = await fetch(`${environment.SERVER_URI}/api/orders`)
      const orders_response = await orders_list.json()
      const view_order_delivery = orders_response.records.map((x:any)=>x.orderid)
      return view_order_delivery
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'payment-transaction/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const orders_list = await fetch(`${environment.SERVER_URI}/api/orders`)
      const orders_response = await orders_list.json()
      const payment_transaction_referenceids = orders_response.records.map((x:any)=>x.referenceid)
      return payment_transaction_referenceids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'prod-edit/:pid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const products_list = await fetch(`${environment.SERVER_URI}/api/products`)
      const products_response = await products_list.json()
      const product_pids = products_response.records.map((x:any)=>x.pid)
      return product_pids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'product-details/:pid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const products_list = await fetch(`${environment.SERVER_URI}/api/products`)
      const products_response = await products_list.json()
      const product_pids = products_response.records.map((x:any)=>x.pid)
      return product_pids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'user-delivery',
    renderMode: RenderMode.Prerender
  },
  {
    path:'deliveries',
    renderMode: RenderMode.Prerender
  }
];
