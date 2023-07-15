import React, { ChangeEvent, FormEvent, useState } from 'react';
import { uploadImage } from '../api/uploader';
import { Product } from '../types/Product';
import { addNewProduct } from '../api/firebase';

export default function NewProduct() {
  const [product, setProduct] = useState<Product>({
    title: '',
    price: '',
    category: '',
    description: '',
    options: '',
  });
  const [file, setFile] = useState<File | null>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 1. 제품의 사진을 cloudinary에 업로드 후 url 획득
    if (file !== null && file !== undefined) {
      uploadImage(file).then((url) => {
        console.log(url);
        // 2. firebase에 새로운 제품을 추가
        addNewProduct(product, url);
      });
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
    <section>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="bg-brand text-white py-2 px-4">
          제품 등록하기
        </button>
      </form>
    </section>
  );
}
