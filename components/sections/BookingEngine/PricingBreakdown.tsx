
import React from 'react';

interface PricingBreakdownProps {
  basePrice: number;
  nights: number;
  subtotal: number;
  earlyBirdDiscount: number;
  serviceFee: number;
  total: number;
}

export const PricingBreakdown: React.FC<PricingBreakdownProps> = ({
  basePrice,
  nights,
  subtotal,
  earlyBirdDiscount,
  serviceFee,
  total,
}) => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="space-y-4 text-base">
        <div className="flex justify-between items-center">
          <span className="underline text-gray-900">Accommodation  </span>
        <span className="text-gray-900">£{(total - serviceFee).toFixed(2)}</span>
        </div>
        
    
        
        <div className="flex justify-between items-center">
          <span className="underline text-gray-900"> Cleaning fee</span>
          <span className="text-gray-900"><span className="text-gray-900">£{Number(serviceFee)} </span> </span>
        </div>
      </div>
      
      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-base font-semibold text-gray-900">£{total} </span>
        </div>
      </div>
    </div>
  );
};