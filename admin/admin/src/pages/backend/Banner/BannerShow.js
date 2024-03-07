function BannerShow() {
    return (
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Chi tiết</h1>
           <div className="row mt-2 align-items-center">
              <div className="col-md-12 text-end">
                 <a href="banner_index.html" className="btn btn-primary btn-sm">
                    <i className="fa fa-arrow-left"></i> Về danh sách
                 </a>
                 <a href="banner_edit.html" className="btn btn-success btn-sm">
                    <i className="fa fa-edit"></i> Sửa
                 </a>
                 <a href="banner_index.html" className="btn btn-danger btn-sm">
                    <i className="fa fa-trash"></i> Xóa
                 </a>
              </div>
           </div>
        </section>
        <section className="content-body my-2">

           <table className="table table-bordered">
              <thead>
                 <tr>
                    <th style={{width: '180px'}}>Tên trường</th>
                    <th>Giá trị</th>
                 </tr>
              </thead>
              <tbody>
                 <tr>
                    <td>Id</td>
                    <td>1</td>
                 </tr>
              </tbody>
           </table>

        </section>
     </div>
     );
}

export default BannerShow;