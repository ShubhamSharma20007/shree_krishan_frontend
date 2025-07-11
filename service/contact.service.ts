import { instance } from "../src/helper/instance";

class ConntactService {
  contactMail(obj: any): Promise<any> {
    return instance.post('/send-email', obj).then(res => res.data);
  }
}

const ConntactServiceInstance = new ConntactService();
export default ConntactServiceInstance;
