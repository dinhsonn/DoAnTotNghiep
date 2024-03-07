function ContactReply() {
    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Trả lời liên hệ</h1>
           <div className="text-end">
              <a href="contact_index.html" className="btn btn-sm btn-success">
                 <i className="fa fa-arrow-left"></i> Về danh sách
              </a>
              <button type="submit" className="btn btn-success btn-sm text-end">
                 <i className="fa fa-save" aria-hidden="true"></i> Trả lời liên hệ
              </button>
           </div>
        </section>
        <section className="content-body my-2">

           <div className="row">
              <div className="col-4">
                 <div className="mb-3">
                    <label htmlFor="name" className="text-main">Họ tên</label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="Nhập họ tên"
                       readonly/>
                 </div>
              </div>
              <div className="col-4">
                 <div className="mb-3">
                    <label htmlFor="phone" className="text-main">Điện thoại</label>
                    <input type="text" name="phone" id="phone" className="form-control"
                       placeholder="Nhập điện thoại" readonly/>
                 </div>
              </div>
              <div className="col-4">
                 <div className="mb-3">
                    <label htmlFor="email" className="text-main">Email</label>
                    <input type="text" name="email" id="email" className="form-control" placeholder="Nhập email"
                       readonly/>
                 </div>
              </div>
           </div>
           <div className="row">
              <div className="col-12">
                 <div className="mb-3">
                    <label htmlFor="title" className="text-main">Tiêu đề</label>
                    <input type="text" name="title" id="title" className="form-control" placeholder="Nhập tiêu đề"
                       readonly/>
                 </div>
                 <div className="mb-3">
                    <label htmlFor="content_old" className="text-main">Nội dung</label>
                    <textarea name="content_old" id="content_old" className="form-control"
                       placeholder="Nhập nội dung liên hệ" readonly></textarea>
                 </div>
                 <div className="mb-3">
                    <label htmlFor="content" className="text-main">Nội dung trả lời</label>
                    <textarea name="content" id="content" className="form-control"
                       placeholder="Nhập nội dung liên hệ" rows="5"></textarea>
                 </div>
              </div>
           </div>

        </section>
     </div>
     );
}

export default ContactReply;