import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageService from '../../../services/ImageServices';
import ProductService from '../../../services/ProductServices';
import axios from "axios";

function ImageEdit() {
    let { id } = useParams();
    const [image, setImage] = useState({
        name: '',
        productId: '',
        image: '',
        link: '',
        sortOrder: '',
        status: '',
    });

    const [products, setProducts] = useState([]);
    const [newImage, setNewImage] = useState(null);
    const [file, setFile] = useState(null);
    const [imageName, setImageName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        ImageService.getById(id)
            .then(response => {
                setImage(response.data);
                setImageName(response.data.image.replace('.png', ''));
            })
            .catch(error => {
                console.error('Error fetching slider data:', error);
            }); loadProducts();
    }, [id]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setNewImage(selectedFile);
    };

    const handleNameChange = (e) => {
        setImageName(e.target.value);
    };


    const loadProducts = async () => {
        try {
            const response = await ProductService.getAll();
            setProducts(response.data.content);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (newImage) {
            setNewImage(null);
        }
        setImage(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageName) {
            setMessage('Vui lòng nhập tên tùy chỉnh.');
            return;
        }

        const formDataImage = { ...image };
        const fileName = imageName.endsWith('.png') ? imageName : imageName + '.png';
        formDataImage.image = fileName;

        try {
            if (newImage) {
                const formDataUpload = new FormData();
                formDataUpload.append('file', file);
                formDataUpload.append('customName', imageName);

                const response = await axios.post('http://localhost:8082/api/productimages/image', formDataUpload);
                setMessage(response.data);
                setFile(null);
                setImageName('');
            }

            if (newImage) {
                ImageService.update(formDataImage, id)
                    .then(response => {
                        console.log("Updated image:", response.data);
                        alert('Ảnh cập nhật thành công!');
                    })
                    .catch(error => {
                        console.error('Error updating image:', error);
                    });
            } else {
                ImageService.update(formDataImage, id)
                    .then(response => {
                        console.log("Updated image:", response.data);
                        alert('Ảnh cập nhật thành công!');
                    })
                    .catch(error => {
                        console.error('Error updating image:', error);
                    });
            }
        } catch (error) {
            setMessage('Lỗi khi tải lên ảnh.');
            console.error(error);
        }
    };


    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Cập nhật ảnh</h1>
                <div className="text-end">
                    <a href="/image" className="btn btn-sm btn-success">
                        <i className="fa fa-arrow-left"></i> Về danh sách
                    </a>
                </div>
            </section>
            <section className="content-body my-2">
                <form onSubmit={handleSubmit}>
                    {/* Form fields for editing image */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Tên ảnh:</label>
                        <input type="text" id="name" name="name" className="form-control" value={image.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">Link:</label>
                        <input type="text" id="link" name="link" className="form-control" value={image.link} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productId" className="form-label">Product ID:</label>
                        <select id="productId" name="productId" className="form-select" value={image.productId} onChange={handleChange}>
                            <option value="">Chọn sản phẩm</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sortOrder" className="form-label">Thứ tự:</label>
                        <input type="text" id="sortOrder" name="sortOrder" className="form-control" value={image.sortOrder} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Trạng thái:</label>
                        <input type="text" id="status" name="status" className="form-control" value={image.status} onChange={handleChange} />
                    </div>
                    {/* File upload */}
                    <div className="box-container mt-4 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                            <strong>Hình ảnh (*)</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                            <input type="file" onChange={handleFileChange} />
                            <br />
                            <input type="text" placeholder="Custom Name" value={imageName} onChange={handleNameChange} />
                            <br />
                        </div>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary">Cập nhật</button>
                </form>
            </section>
        </div>
    );
}

export default ImageEdit;
