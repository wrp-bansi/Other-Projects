
import { toast } from 'react-toastify';

const showToast = (message, type) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    default:
      toast(message);
      break;
  }
};

const Toast = () => {
  return null;
};

export { showToast };
export default Toast;
