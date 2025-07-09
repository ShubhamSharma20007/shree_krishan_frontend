import { instance } from "../src/helper/instance";

class ProductService {
  createProduct(obj: any): Promise<any> {
    return instance.post('/products', obj, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data.product);
  }

  updateProduct(id: string, obj: any): Promise<any> {
    return instance.put('/products/' + id, obj, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data?.product);
  }

  getProducts(params: { brand?: string } = {}): Promise<any> {
    return instance.get('/products', { params }).then(res => res.data);
  }

  deleteProduct(id: string): Promise<any> {
    return instance.put('/products/' + id + '/delete').then(res => res.data);
  }
}

const ProductServiceInstance = new ProductService();
export default ProductServiceInstance;
