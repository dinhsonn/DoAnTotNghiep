import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageService from "../../../services/ImageServices";
import Pagination from "../../../layouts/LayoutAdmin/Pagination";

function ProductImage() {
  const [productImages, setProductImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    loadProductImages();
  }, []);

  const loadProductImages = async () => {
    try {
      const response = await ImageService.getAll();
      setProductImages(response.data.content);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); 
  };

  const filteredImages = productImages.filter((productImage) =>
    productImage.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentImages = filteredImages.slice(indexOfFirstProduct, indexOfLastProduct);

  const removeImage = async (id) => {
    try {
      await ImageService.remove(id);
      setProductImages(productImages.filter((image) => image.id !== id));
      console.log("Image deleted successfully");
      alert("Ảnh đã được xóa!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getImgUrl = (imageName) => {
    const endpoint = 'productimages'; 
    let imageUrl = `http://localhost:8082/api/${endpoint}/image/${imageName}`;
    
    imageUrl = imageUrl.replace(/\.png/g, "") + ".png";

    return imageUrl;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Sản phẩm</h1>
        <Link to={"/image/create"} className="btn-add">
          Thêm mới
        </Link>
        <div className="row mt-3 align-items-center">
          <div className="col-6">
            <ul className="manager">
              <li>
                <Link to={"/image"}>Tất cả {(productImages.length)}</Link>
              </li>
              <li>
                <Link to={"/image/trash"}>Rác</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="search d-inline"
              onChange={handleSearch}
            />
            <button className="d-inline">Tìm kiếm</button>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredImages.length / productsPerPage)}
            onPageChange={paginate}
          />
        </div>
      </section>
      <section className="content-body my-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" style={{ width: 30 }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th>Tên ảnh</th>
              <th style={{ width: 200 }}>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Thứ tự</th>
              <th>Trạng thái</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {currentImages.map((image, index) => (
              <tr key={index} className="datarow">
                <td>
                  <input type="checkbox" id={`checkId${index}`} />
                </td>
                <td>
                  <div className="name">
                    <Link to={`/image/edit/${image.id}`}>{image.name}</Link>
                  </div>
                  <div className="function_style">
                    <Link to={`/image/edit/${image.id}`} className="px-1 text-primary">
                      <i className="fa fa-edit" />
                    </Link>
                    <Link to={`/image/show/${image.id}`} className="px-1 text-info">
                      <i className="fa fa-eye" />
                    </Link>
                    <Link to="#" className="text-danger mx-1" onClick={() => removeImage(image.id)}>
                      <i className="fa fa-trash"></i>
                    </Link>
                  </div>
                </td>
                <td>
                  <img src={getImgUrl(image.image)} alt={image.image} style={{ width: '180px' }} />
                </td>                
                <td>{image.productId.name}</td>
                <td>{image.sortOrder}</td>
                <td>{image.status}</td>
                <td>{image.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ProductImage;
