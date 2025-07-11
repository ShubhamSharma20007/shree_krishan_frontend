import { instance } from "../src/helper/instance";

class DashboardService {
   getDashboardData(): Promise<any>{
    return instance.get('/dashboard-data',).then(res=>res.data)
   };
}

const DashboardServiceInstance  = new DashboardService();
export default  DashboardServiceInstance