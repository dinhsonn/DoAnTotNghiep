function BannerCreate() {
    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Thêm banner</h1>
           <div className="text-end">
              <a href="banner_index.html" className="btn btn-sm btn-success">
                 <i className="fa fa-arrow-left"></i> Về danh sách
              </a>
           </div>
        </section>
        <section className="content-body my-2">
           <div className="row">
              <div className="col-md-9">
                 <div className="mb-3">
                    <label><strong>Tên banner (*)</strong></label>
                    <input type="text" name="name" className="form-control" placeholder="Nhập tên banner" />
                 </div>
                 <div className="mb-3">
                    <label><strong>Liên kết</strong></label>
                    <input type="text" name="link" className="form-control" placeholder="Nhập liên kết" />
                 </div>
                 <div className="mb-3">
                    <label><strong>Mô tả (*)</strong></label>
                    <textarea name="description" rows="5" className="form-control"
                       placeholder="Nhập mô tả"></textarea>
                 </div>
              </div>
              <div className="col-md-3">
                 <div className="box-container mt-4 bg-white">
                    <div className="box-header py-1 px-2 border-bottom">
                       <strong>Đăng</strong>
                    </div>
                    <div className="box-body p-2 border-bottom">
                       <p>Chọn trạng thái đăng</p>
                       <select name="status" className="form-select">
                          <option value="1">Xuất bản</option>
                          <option value="2">Chưa xuất bản</option>
                       </select>
                    </div>
                    <div className="box-footer text-end px-2 py-3">
                       <button type="submit" className="btn btn-success btn-sm text-end">
                          <i className="fa fa-save" aria-hidden="true"></i> Đăng
                       </button>
                    </div>
                 </div>
                 <div className="box-container mt-4 bg-white">
                    <div className="box-header py-1 px-2 border-bottom">
                       <strong>Vị trí (*)</strong>
                    </div>
                    <div className="box-body p-2 border-bottom">
                       <select name="position" className="form-select">
                          <option>Chọn vị trí</option>
                          <option value="slideshow">Slide Show</option>
                          <option value="ads">Quảng cáo</option>
                       </select>
                       <p className="pt-2">Vị trí hiển thị banner</p>
                    </div>
                 </div>
                 <div className="box-container mt-4 bg-white">
                    <div className="box-header py-1 px-2 border-bottom">
                       <strong>Hình (*)</strong>
                    </div>
                    <div className="box-body p-2 border-bottom">
                       <input type="file" name="image" className="form-control" />
                    </div>
                 </div>
              </div>
           </div>
        </section>
     </div> );
}

export default BannerCreate;