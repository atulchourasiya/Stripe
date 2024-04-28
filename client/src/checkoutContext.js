import { createContext, useEffect, useState } from "react";
export const CheckOutContext = createContext();

const CheckOutProvider = ({ children }) => {
   const [checkout, setCheckOut] = useState([]);
   
   return (
      <CheckOutContext.Provider value={{ checkout, setCheckOut }}>
         {children}
      </CheckOutContext.Provider>
   );
};

export default CheckOutProvider;