import React from 'react';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import WidgetsIcon from '@mui/icons-material/Widgets';

export const Trusted = () => {
  return (
    <div className="flex flex-col p-5 bg-[#0f52ba] text-white gap-4">
        <div className="flex justify-center items-center font-extrabold mt-2">
            <p>Trusted by 100+ World's Best Companies</p>
        </div>
        <div className="flex flex-col md:flex-row justify-around font-bold items-center gap-4 md:gap-0 md:py-5">
            <div> <AcUnitIcon/> AOT</div>
            <div> <CreditCardOffIcon/> PayCardLess</div>
            <div> <ShoppingCartCheckoutIcon/> Let's Shop</div>
            <div> <WidgetsIcon/> Internet UI</div>
        </div>
    </div>
  )
}
