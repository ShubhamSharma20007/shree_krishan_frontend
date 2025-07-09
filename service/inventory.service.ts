import { instance } from "../src/helper/instance";

class InventroyService {
    createBulkInventoryProduct(items:any[]):Promise<any>{
        console.log(items,121212)
        return instance.post('/inventory/add',items).then(res=>res.data)
    };
    getInventoryProduct():Promise<any>{
        return instance.get('/inventory').then(res=>res.data?.inventory)
    };
    updateInventoryProduct(id:string,qty:string):Promise<any>{
        return instance.put('/inventory/'+id,{qty}).then(res=>res.data?.stockEntry || res.data)
    };
    deleteInventoryProduct(id:string):Promise<any>{
        return instance.put('/inventory/'+id+"/delete",).then(res=>res.data)
    }; 
    // reportProducts():Promise<any>{
    //     return instance.get('/inventory/products').then(res=>res.data?.products)
    // };
    // populateProducts(productId:string):Promise<any>{
    //     return instance.get('/inventory/productParts/'+productId).then(res=>res.data?.productParts || res.data)
    // }



}

const InventoryServiceInstance  = new InventroyService();
export default  InventoryServiceInstance