import { instance } from "../src/helper/instance";

class BrandService {
    getAllBrand():Promise<any>{
        return instance.get('/brands').then(res=>res.data)
    };
    updateBrand(id:string,payload:any):Promise<any>{
    
        return instance.put('/brands/'+id,payload,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(res=>res.data)
    };
    createBrand(formData:any):Promise<any>{
        return instance.post('/brands',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(res=>res.data)
    };
     deleteBrand(id:string): Promise<any>{
    return instance.put('/brands/'+id+'/delete').then(res=>res.data)
   };

}

const BrandServiceInstance  = new BrandService();
export default  BrandServiceInstance