import { toast } from 'react-toastify';

const showToast = (message, type) => {
   if (type === 'error') {
      toast.error(message, {
         position: 'top-right',
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      });
   } else if (type === 'success') {
      toast.success(message, {
         position: 'top-right',
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      });
   } else {
      toast.info(message, {
         position: 'top-right',
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      });
   }
}
export default showToast;
