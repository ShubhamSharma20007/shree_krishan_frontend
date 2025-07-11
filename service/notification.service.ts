import { instance } from "../src/helper/instance";

class NotificationService {
    getNotification():Promise<any>{
        return instance.get('/stockAlerts').then(res=>res.data)
    }

}

const NotificationServiceInstance  = new NotificationService();
export default  NotificationServiceInstance