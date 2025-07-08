import { instance } from "../src/helper/instance";

class ReportService {
    getStockReport(productId:string,productPartId:string):Promise<any>{
        let obj = {
            productId,
            productPartId
        }
        return instance.post('/stock-report',obj).then(res=>res.data?.stockReport)
    }

}

const ReportServiceInstance  = new ReportService();
export default  ReportServiceInstance