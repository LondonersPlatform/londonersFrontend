import StripeWrapper from '@/components/StripeWrapper'
import React from 'react'
import PaymentPage from './component/PaymentPage'

function Payment() {
  return (
    <div>
    <StripeWrapper>
   <PaymentPage  /> 
    </StripeWrapper>
    </div>
  )
}

export default Payment