import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TrashServices from "../../../services/TrashServices";
import ImageService from "../../../services/ImageServices";

function ImageTrash() {
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        loadProductImages();
    }, []);

    const loadProductImages = async () => {
        try {
            const response = await TrashServices.getAllImage();
            setProductImages(response.data.content);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    const removeImage = async (id) => {
        try {
            await TrashServices.remove(id);
            setProductImages(productImages.filter((image) => image.id !== id));
            console.log("Image deleted successfully");
            alert("Ảnh đã được xóa!");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const backImage = async (id) => {
        try {
            await TrashServices.removeImage(id);
            await ImageService.create(productImages.find(image => image.id === id));
            setProductImages(productImages.filter((image) => image.id !== id));
            console.log("Image restored successfully");
            alert("Ảnh đã được khôi phục!");
        } catch (error) {
            console.error("Error restoring image:", error);
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
                <h1 className="d-inline">Thùng rác trang đơn</h1>
                <div className="row mt-3 align-items-center">
          <div className="col-6">
            <ul className="manager">
              <li>
                <Link to={"/image"}>Tất cả ảnh</Link>
              </li>

              <li><Link to={"/image/trash"}>Rác (12)</Link></li>
            </ul>
          </div>
          <div className="col-6 text-end">
            <input type="text" className="search d-inline" />
            <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th className="text-center" style={{ width: '130px' }}>Hình ảnh</th>
                            <th>Tên ảnh</th>
                            <th className="text-center" style={{ width: '30px' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productImages.map((image) => (
                            <tr key={image.id} className="datarow">
                                <td>
                                    <input type="checkbox" id={`checkId${image.id}`} />
                                </td>
                                <td>
                                    <img className="img-fluid" src={getImgUrl(image.image)} alt={image.name} />
                                </td>
                                <td>
                                    <div className="name">
                                        <Link to={`/details/${image.id}`}>
                                            {image.name}
                                        </Link>
                                    </div>
                                    <div className="function_style">
                                        <a href="#" className="text-primary mx-1" onClick={() => backImage(image.id)}>
                                            <i className="fa fa-undo"></i>
                                        </a>
                                        <a href="#" className="text-danger mx-1" onClick={() => removeImage(image.id)}>
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                                <td className="text-center">{image.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ImageTrash;
