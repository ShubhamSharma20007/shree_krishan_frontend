import { instance } from "../src/helper/instance";

class PasswordService {
  sendOtp(obj: any): Promise<any> {
    return instance.post('/send-otp', obj).then(res => res.data);
  }

  verifyOtp(obj: any): Promise<any> {
    return instance.post('/verify-otp', obj).then(res => res.data);
  }

  resetPassword(obj: any): Promise<any> {
    return instance.post('/reset-password', obj).then(res => res.data);
  }
}

const PasswordServiceInstance = new PasswordService();
export default PasswordServiceInstance;
