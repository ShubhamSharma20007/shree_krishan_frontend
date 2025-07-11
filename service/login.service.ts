import { instance } from "../src/helper/instance";

class LoginService {
  userLogin(obj: any): Promise<any> {
    return instance.post('/login', obj,{withCredentials: true}).then(res => res.data);
  }
}

const LoginServiceInstance = new LoginService();
export default LoginServiceInstance;
