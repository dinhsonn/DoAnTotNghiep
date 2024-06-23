import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductServices";
import CategoryService from "../../../services/CategoryServices";
import BrandServices from "../../../services/BrandServices";
import TrashServices from "../../../services/TrashServices";
import ImageService from "../../../services/ImageServices";
import * as XLSX from 'xlsx';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const [categoryOptionValue, setCategoryOptionValue] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadBrands();
    loadCategoryOption();
    loadCategoryOptionValue();
    loadProductImages();
  }, []);

  const loadProductImages = async () => {
    try {
      const response = await ImageService.getAll();
      setImages(response.data.content);
    } catch (error) {
      console.error("Error loading product images:", error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await ProductService.getAll();
      setProducts(response.data.content);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await CategoryService.getAll();
      setCategories(response.data.content);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadCategoryOption = async () => {
    try {
      const response = await CategoryService.categoryOption();
      setCategoryOption(response.data.content);
    } catch (error) {
      console.error("Error loading category options:", error);
    }
  };

  const loadCategoryOptionValue = async () => {
    try {
      const response = await CategoryService.categoryOptionValue();
      setCategoryOptionValue(response.data.content);
    } catch (error) {
      console.error("Error loading category option values:", error);
    }
  };

  const loadBrands = async () => {
    try {
      const response = await BrandServices.getAll();
      setBrands(response.data.content);
    } catch (error) {
      console.error("Error loading brands:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const productImage = images.find(image => image.productId.id === id);
      if (productImage) {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này và ảnh đi kèm?");
        if (!confirmDelete) {
          return;
        }
      }
      await ProductService.remove(id);
      await TrashServices.create(products.find(product => product.id === id));
      setProducts(products.filter(product => product.id !== id));
      console.log("Product deleted successfully");
      alert("Sản phẩm đã được xóa thành công!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Xóa sản phẩm không thành công. Vui lòng thử lại!");
    }
  };

  const exportToExcel = () => {
    const simplifiedProducts = products.map(product => ({
      'ID': product.id,
      'Tên sản phẩm': product.name,
      'Giá': product.price,
      'Số lượng': product.qty,
      'Mô tả': product.description,
      'Bảo hành': product.warranty,
      'Thông số': product.specifications,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(simplifiedProducts);

    const header = [['ID', 'Tên sản phẩm', 'Giá', 'Số lượng', 'Mô tả', 'Bảo hành', 'Thông số']];
    XLSX.utils.sheet_add_aoa(ws, header, { origin: 'A1' });

    ws['!cols'] = [
      { wpx: 100 }, 
      { wpx: 200 }, 
      { wpx: 100 }, 
      { wpx: 100 }, 
      { wpx: 200 }, 
      { wpx: 200 }, 
      { wpx: 400 }  
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Products');

    XLSX.writeFile(wb, 'Danh sách sản phẩm.xlsx');
  };

  const getImgUrl = (imageName) => {
    const endpoint = 'productimages'; // Replace with your actual endpoint
    let imageUrl = `http://localhost:8082/api/${endpoint}/image/${imageName}`;
    imageUrl = imageUrl.replace(/\.png/g, "") + ".png";
    return imageUrl;
  };

  const handleAddImage = (productId) => {
    navigate(`/image/create?productId=${productId}`);
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Sản phẩm</h1>
        <Link to={"/product/create"} className="btn-add">Thêm mới</Link>
        <button onClick={exportToExcel}>Xuất ra Excel</button>
        <div className="row mt-3 align-items-center">
          <div className="col-6">
            <ul className="manager">
              <li><Link to={"/product"}>Tất cả ({products.length})</Link></li>
              <li><Link to={"/product/trash"}>Rác</Link></li>
            </ul>
          </div>
          <div className="col-6 text-end">
            <input type="text" className="search d-inline" onChange={handleSearch} />
            <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>
        <div className="row mt-1 align-items-center">
          <div className="col-md-8">
            <select name="" className="d-inline me-1">
              <option value="">Tất cả danh mục</option>
            </select>
            <select name="" className="d-inline me-1">
              <option value="">Tất cả thương hiệu</option>
            </select>
            <button className="btnfilter">Lọc</button>
          </div>
          <div className="col-md-4 text-end">
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-sm justify-content-end">
                <li className="page-item disabled">
                  <a className="page-link">«</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">»</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section className="content-body my-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" style={{ width: 30 }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th>Tên sản phẩm</th>
              <th>Ảnh</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tên danh mục</th>
              <th>Tên option danh mục</th>
              <th>Tên giá trị danh mục</th>
              <th>Tên thương hiệu</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {(filteredProducts.length > 0 ? filteredProducts : products).map((product, index) => {
              const productImage = images.find(image => image.productId.id === product.id);
              return (
                <tr key={index} className="datarow">
                  <td>
                    <input type="checkbox" id={`checkId${index}`} />
                  </td>
                  <td>
                    <div className="name">
                      <Link to={`/product/edit/${product.id}`}>{product.name}</Link>
                    </div>
                    <div className="function_style">
                      <Link to="#" className="px-1 text-success">
                        <i className="fa fa-toggle-on" />
                      </Link>
                      <Link to={`/product/edit/${product.id}`} className="px-1 text-primary">
                        <i className="fa fa-edit" />
                      </Link>
                      <Link to={`/product/show/${product.id}`} className="px-1 text-info">
                        <i className="fa fa-eye" />
                      </Link>
                      <Link to="#" className="text-danger mx-1" onClick={() => removeProduct(product.id)}>
                        <i className="fa fa-trash"></i>
                      </Link>
                    </div>
                  </td>
                  <td>
  {productImage && (
    <img src={getImgUrl(productImage.image)} alt={productImage.image} style={{ width: '180px' }} />
  )}
  <button className="btn btn-primary" onClick={() => handleAddImage(product.id)}>Thêm hình ảnh</button>
</td>

                  <td>{product.price}</td>
                  <td>{product.qty}</td>
                  <td>{product.categoryId.name}</td>
                  <td>{product.categoryOption.name}</td>
                  <td>{product.categoryOptionValue.value}</td>
                  <td>{product.brandId.name}</td>
                  <td>{product.id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ProductList;
