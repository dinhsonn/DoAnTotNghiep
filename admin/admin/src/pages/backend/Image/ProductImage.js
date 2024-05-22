import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageService from "../../../services/ImageServices";
import TrashServices from "../../../services/TrashServices";

function ProductImage() {
  const [productImages, setProductImages] = useState([]);

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

  const removeImage = async (id) => {
    try {
      await ImageService.remove(id);
      await TrashServices.createImage(productImages.find(image => image.id === id));
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
          <div className="col-6 text-end">
            <input type="text" className="search d-inline" />
            <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>
      </section>
      <section className="content-body my-2">
        {/* Phần hiển thị danh sách sản phẩm */}
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
            {productImages.map((image, index) => (
              <tr key={index} className="datarow">
                {/* Thêm các cột dữ liệu */}
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
