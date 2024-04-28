
import { useState } from "react";
import BarLoader from "react-spinners/ClipLoader";


function Loader() {
   return (
      <div className="sweet-loading">
         <BarLoader
            size={50}
            data-testid="loader"
         />
      </div>
   );
}

export default Loader;