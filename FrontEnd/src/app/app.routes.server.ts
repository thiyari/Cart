import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';
import { PrerenderParamsService } from './service/prerender-params.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  { 
    path:'dollar-factor',  
    renderMode: RenderMode.Server
  },
  {
    path:'products',     
    renderMode: RenderMode.Server
  },
  {
    path:'cart',    
    renderMode: RenderMode.Server
  },
  {
    path:'prodreg',    
    renderMode: RenderMode.Server
  },
  {
    path:'login',    
    renderMode: RenderMode.Server
  },
  {
    path:'admin',    
    renderMode: RenderMode.Server
  },
  {
    path:'orders',    
    renderMode: RenderMode.Server
  },
  {
    path:'googlepay',    
    renderMode: RenderMode.Server
  },
  {
    path:'prods',    
    renderMode: RenderMode.Server
  },
  {
    path:'new-admin',    
    renderMode: RenderMode.Server
  },
  {
    path:'admins-panel',    
    renderMode: RenderMode.Server
  },
  {
    path:'admin-orders',    
    renderMode: RenderMode.Server
  },
  {
    path:'pending-orders',    
    renderMode: RenderMode.Server
  },
  {
    path:'user-orders',    
    renderMode: RenderMode.Server
  },
  {
    path:'user-requests',    
    renderMode: RenderMode.Server
  },
  {
    path:'paypal',
    renderMode: RenderMode.Server
  },
  {
    path:'user-delivery',
    renderMode: RenderMode.Server
  },
  {
    path:'deliveries',
    renderMode: RenderMode.Server
  },
  {
    path:'edit-admin/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const admin_ids = inject(PrerenderParamsService)
      const ids = await admin_ids.edit_admin();
      return ids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'viewrequest/:orderid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const order_ids = inject(PrerenderParamsService)
      const orderids = await order_ids.orders()
      return orderids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'phonepetxn/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const phonepe_reference_ids = inject(PrerenderParamsService)
      const reference_ids = await phonepe_reference_ids.phonepe_txn()
      return reference_ids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'googlepaytxn/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const googlepay_reference_ids = inject(PrerenderParamsService)
      const reference_ids = await googlepay_reference_ids.googlepay_txn()
      return reference_ids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'paypaltxn/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const paypal_reference_ids = inject(PrerenderParamsService)
      const reference_ids = await paypal_reference_ids.paypal_txn()
      return reference_ids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'razorpaytxn/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const razorpay_reference_ids = inject(PrerenderParamsService)
      const reference_ids = await razorpay_reference_ids.razorpay_txn()
      return reference_ids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'product/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const product_pids = inject(PrerenderParamsService)
      const pids = await product_pids.product();
      return pids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'payment/:orderid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const order_ids = inject(PrerenderParamsService)
      const orderids = await order_ids.orders()
      return orderids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'view-order/:orderid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const order_ids = inject(PrerenderParamsService)
      const orderids = await order_ids.orders()
      return orderids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'view-order-delivery/:orderid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const order_ids = inject(PrerenderParamsService)
      const orderids = await order_ids.orders()
      return orderids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'payment-transaction/:referenceid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const payment_reference_ids = inject(PrerenderParamsService)
      const reference_ids = await payment_reference_ids.payment_txn()
      return reference_ids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'prod-edit/:pid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const product_pids = inject(PrerenderParamsService)
      const pids = await product_pids.product_view();
      return pids
    },
    fallback: PrerenderFallback.Server
  },
  {
    path:'product-details/:pid',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const product_pids = inject(PrerenderParamsService)
      const pids = await product_pids.product_view();
      return pids
    },
    fallback: PrerenderFallback.Server
  }
];



