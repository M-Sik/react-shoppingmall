import React, { ChangeEvent, FormEvent, useState } from 'react';
import { uploadImage } from '../api/uploader';
import { Product } from '../types/Product';
import { addNewProduct } from '../api/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function NewProduct() {
  const [product, setProduct] = useState<Product>({
    title: '',
    price: '',
    category: '',
    description: '',
    options: '',
  });
  const [file, setFile] = useState<File | null>();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | undefined>();
  const queryClient = useQueryClient();
  const addProduct = useMutation(
    // 어떤것을 인자로 받아서 어떤 함수를 호출할지 정의
    ({ product, url }: { product: Product; url: any }) => addNewProduct(product, url),
    // 뮤테이션이 성공적으로 되면 캐싱을함
    {
      onSuccess: () => queryClient.invalidateQueries(['products']),
    },
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // 1. 제품의 사진을 cloudinary에 업로드 후 url 획득
    if (file !== null && file !== undefined) {
      uploadImage(file)
        .then((url) => {
          addProduct.mutate(
            { product, url },
            {
              onSuccess: () => {
                setSuccess('성공적으로 제품이 추가 되었습니다.');
                setTimeout(() => {
                  setSuccess(undefined);
                }, 4000);
              },
            },
          );
        })
        .finally(() => setIsUploading(false));
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <section className="w-full text-center py-10">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">{success}</p>}
      {file && (
        <img className="w-96 mx-auto mb-2" src={URL.createObjectURL(file)} alt="local file" />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col px-12">
        <input type="file" accept="image/*" name="file" required onChange={handleChange} />
        <input
          type="text"
          name="title"
          value={product.title ?? ''}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ''}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ''}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ''}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ''}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <button type="submit" className="bg-brand text-white py-2 px-4" disabled={isUploading}>
          {isUploading ? '업로드중...' : '제품 등록하기'}
        </button>
      </form>
    </section>
  );
}
