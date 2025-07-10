import { instance } from "../src/helper/instance";

class NotificationService {
    getNotification():Promise<any>{
        return instance.post('/stock-report').then(res=>res.data?.stockReport)
    }

}

const NotificationServiceInstance  = new NotificationService();
export default  NotificationServiceInstance