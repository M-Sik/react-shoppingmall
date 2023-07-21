import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewProduct, getProducts as fetchProducts } from '../api/firebase';
import { Product } from '../types/Product';

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(['products'], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    // 어떤것을 인자로 받아서 어떤 함수를 호출할지 정의
    ({ product, url }: { product: Product; url: any }) => addNewProduct(product, url),
    // 뮤테이션이 성공적으로 되면 캐싱을함
    {
      onSuccess: () => queryClient.invalidateQueries(['products']),
    },
  );

  return { productsQuery, addProduct };
}
