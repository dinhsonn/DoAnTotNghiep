import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageService from '../../../services/ImageServices';

function ImageShow() {
    let { id } = useParams();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadImage();
    }, []);

    const loadImage = async () => {
        try {
            const response = await ImageService.getById(id);
            setImage(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên ảnh:</label>
                    <input type="text" id="name" name="name" className="form-control" value={image.name} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Ảnh:</label>
                    <img src={`http://localhost:8082/api/productimages/image/${image.image}`} alt={image.image} width="200px" />
                </div>

                <div className="mb-3">
                    <label htmlFor="link" className="form-label">Link:</label>
                    <input type="text" id="link" name="link" className="form-control" value={image.link} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="productId" className="form-label">Product ID:</label>
                    <input type="text" id="productId" name="productId" className="form-control" value={image.productId.name} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="sortOrder" className="form-label">Thứ tự:</label>
                    <input type="text" id="sortOrder" name="sortOrder" className="form-control" value={image.sortOrder} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Trạng thái:</label>
                    <input type="text" id="status" name="status" className="form-control" value={image.status} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Ngày tạo:</label>
                    <input type="text" id="created_at" name="created_at" className="form-control" value={image.createdAt} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Ngày update:</label>
                    <input type="text" id="updated_at" name="updated_at" className="form-control" value={image.updatedAt} readOnly />
                </div>
            </section>
        </div>
    );
}

export default ImageShow;
