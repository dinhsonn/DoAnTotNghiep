import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import ProductService from "../../../services/ProductServices";
import CategoryService from "../../../services/CategoryServices";
import BrandServices from "../../../services/BrandServices";

function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    content: "",
    price: "",
    qty: "",
    warranty: "",
    description: "",
    categoryId: "",
    brandId: "",
    specifications: "",
    status: "1",
    categoryOption: "",
    categoryOptionValue: "",
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryOptionValues, setCategoryOptionValues] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await ProductService.getById(id);
        const fetchedProduct = productResponse.data;
        setProduct({
          ...fetchedProduct,
          categoryId: fetchedProduct.categoryId ? fetchedProduct.categoryId.id : "", 
          brandId: fetchedProduct.brandId ? fetchedProduct.brandId.id : "", 
          categoryOption: fetchedProduct.categoryOption ? fetchedProduct.categoryOption.id : "",
          categoryOptionValue: fetchedProduct.categoryOptionValue ? fetchedProduct.categoryOptionValue.id : "",
        });
  
        const categoriesResponse = await CategoryService.getAll();
        setCategories(categoriesResponse.data.content);
  
        const brandsResponse = await BrandServices.getAll();
        setBrands(brandsResponse.data.content);
  
        // Fetch category options if categoryId is present
        if (fetchedProduct.categoryId) {
          fetchCategoryOptionsByCategoryId(fetchedProduct.categoryId.id);
        }
  
        // Fetch category option values if categoryOption is present
        if (fetchedProduct.categoryOption) {
          fetchCategoryOptionValuesByOption(fetchedProduct.categoryOption.id);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  
    fetchProduct();
  }, [id]);
    const fetchCategoryOptionsByCategoryId = async (categoryId) => {
      try {
        const categoryOptionResponse = await CategoryService.categoryOptionByCategoryId(categoryId);
        setCategoryOptions(categoryOptionResponse.data.content);
      } catch (error) {
        console.error("Error fetching category options:", error);
      }
  };

  const fetchCategoryOptionValuesByOption = async (option) => {
    try {
       const categoryOptionValueResponse = await CategoryService.categoryOptionValueByOption(option);
       setCategoryOptionValues(categoryOptionValueResponse.data.content);
    } catch (error) {
       console.error("Error fetching category option values:", error);
    }
 };
 const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'categoryId') {
    fetchCategoryOptionsByCategoryId(value);
  } else if (name === 'categoryOption') {
    fetchCategoryOptionValuesByOption(value);
  }
  setProduct(prevState => ({
    ...prevState,
    [name]: value
  }));
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  const categoryIdObject = categories.find(category => category.id ===  parseInt(product.categoryId));
  const brandIdObject = brands.find(brand => brand.id === parseInt(product.brandId));
  const cateOptionIdObject = categoryOptions.find(categoryOption => categoryOption.id === parseInt(product.categoryOption));
  const cateOptionValueIdObject = categoryOptionValues.find(categoryOptionValue => categoryOptionValue.id === parseInt(product.categoryOptionValue));

  // Tạo object mới để gửi lên server, chỉ chứa các ID
  const updatedProduct = {
    ...product,
    categoryId: categoryIdObject,
    brandId: brandIdObject,
    categoryOption: cateOptionIdObject,
    categoryOptionValue: cateOptionValueIdObject,
 };


  ProductService.update(updatedProduct, id)
    .then((response) => {
      console.log("Updated product:", response.data);
      alert("Cập nhật sản phẩm thành công!");
    })
    .catch((error) => {
      console.error("Error updating product:", error);
    });
};


  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Chỉnh sửa sản phẩm</h1>
        <div className="mt-1 text-end">
          <Link className="btn btn-sm btn-primary" to={"/product"}>
            <i className="fa fa-arrow-left"></i> Về danh sách
          </Link>
        </div>
      </section>
      <section className="content-body my-2">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label><strong>Tên sản phẩm (*)</strong></label>
                <input type="text" placeholder="Nhập tên sản phẩm" name="name" value={product.name} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label><strong>Mô tả (*)</strong></label>
                <textarea name="description" rows="3" value={product.description} onChange={handleChange} className="form-control" placeholder="Nhập mô tả"></textarea>
              </div>
              <div className="mb-3">
                <label><strong>Bảo hành (*)</strong></label>
                <input type="text" value={product.warranty} name="warranty" onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label><strong>Thông số kỹ thuật (*)</strong></label>
                <textarea name="specifications" rows="3" value={product.specifications} onChange={handleChange} className="form-control" placeholder="Nhập thông số kỹ thuật"></textarea>
              </div>
            </div>
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Đăng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select name="status" value={product.status} onChange={handleChange} className="form-select">
                    <option value="1">Xuất bản</option>
                    <option value="2">Chưa xuất bản</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Thương hiệu:</label>
                <select
                  className="form-select"
                  name="brandId"
                  value={product.brandId}
                  onChange={handleChange}
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Danh mục:</label>
                <select
                  className="form-select"
                  name="categoryId"
                  value={product.categoryId}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Option danh mục:</label>
                <select
                  className="form-select"
                  name="categoryOption"
                  value={product.categoryOption}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((categoryOption) => (
                    <option key={categoryOption.id} value={categoryOption.id}>
                      {categoryOption.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Giá trị option danh mục:</label>
                <select
                  className="form-select"
                  name="categoryOptionValue"
                  value={product.categoryOptionValue}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categoryOptionValues.map((categoryOptionValue) => (
                    <option key={categoryOptionValue.id} value={categoryOptionValue.id}>
                      {categoryOptionValue.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Giá và số lượng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <div className="mb-3">
                    <label><strong>Giá bán (*)</strong></label>
                    <input type="number" value={product.price} min="10000" name="price" onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label><strong>Số lượng (*)</strong></label>
                    <input type="number" value={product.qty} min="1" name="qty" onChange={handleChange} className="form-control" />
                  </div>
                </div>
              </div>
              <div className="box-footer text-end px-2 py-2">
                <button type="submit" className="btn btn-success btn-sm text-end">
                  <i className="fa fa-save" aria-hidden="true"></i> Cập nhật
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ProductEdit;
