import { instance } from "../src/helper/instance";

class ProductPartService {
   getProductParts(): Promise<any>{
    return instance.get('/productPart').then(res=>res.data)
   };
   createProductPart(obj:any): Promise<any>{
    return instance.post('/productPart',obj,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(res=>res.data?.productPart)};
    updateProductPart(id:string,obj:any): Promise<any>{
    return instance.put('/productPart/'+id,obj,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(res=>res.data?.productPart)};

   deleteProductPart(id:string): Promise<any>{
    return instance.put('/productPart/'+id+'/delete').then(res=>res.data)
   };
   getSpecificProductPart(id:string): Promise<any>{
    return instance.get('/products/'+id).then(res=>res.data?.productParts)
   }

}

const ProductPartServiceInstance  = new ProductPartService();
export default  ProductPartServiceInstance