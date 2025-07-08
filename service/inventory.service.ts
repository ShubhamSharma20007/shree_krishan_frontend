import { instance } from "../src/helper/instance";

class InventroyService {
    createBulkInventoryProduct(items:any[]):Promise<any>{
        console.log(items,121212)
        return instance.post('/inventory/add',items).then(res=>res.data)
    };
    getInventoryProduct():Promise<any>{
        return instance.get('/inventory').then(res=>res.data?.inventory)
    }


}

const InventoryServiceInstance  = new InventroyService();
export default  InventoryServiceInstance