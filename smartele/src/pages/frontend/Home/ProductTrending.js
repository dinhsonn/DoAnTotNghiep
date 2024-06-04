import { useEffect, useState } from "react";
import CategoryServices from "../../../services/CategoryServices";
import ProductServices from "../../../services/ProductServices";
import ProductItem3 from "../Product/ProductItem3";
function ProductTrending() {
  const [categoryOption, setCategoryOption] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [  productImagesResponse] =
          await Promise.all([
            ProductServices.getProductImage(),
          ]);

        const productImagesData = productImagesResponse.data.content;
    
        setProductImages(productImagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    CategoryServices.getAll()
      .then((response) => {
        setCategoryOption(response.data.content);
        if (response.data.content.length > 0) {
          setSelectedCategory(response.data.content[0].id);
        }
        console.log("data", response.data.content);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    if (selectedCategory) {
      ProductServices.getProductsByCategory(selectedCategory)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  const combinedData = products.map((product) => {
    const correspondingImages = productImages.filter(
      (image) => image.productId.id === product.id && image.sortOrder === 1
    );

    const imageUrls = correspondingImages.map((image) => image.image);

    return {
      ...product,
      image: imageUrls.length > 0 ? imageUrls[0] : null,
    };
  });

  return (
    <div className="container trending">
      <div className="heading heading-flex mb-3">
        <div className="heading-left">
          <h2 className="title">Sản phẩm thịnh hành</h2>
          {/* End .title */}
        </div>
        {/* End .heading-left */}
        <div className="heading-right">
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            {categoryOption.map((category) => (
              <li className="nav-item" key={category.id}>
                <a
                  className={`nav-link ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  id={`${category.id}-link`}
                  data-toggle="tab"
                  href={`#${category.id}-tab`}
                  role="tab"
                  aria-controls={`${category.id}-tab`}
                  aria-selected={selectedCategory === category.id}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* End .heading-right */}
      </div>
      {/* End .heading */}
      <div className="row">
        <div className="col-xl-5col d-none d-xl-block">
          <div className="banner">
            <a href="#">
              <img
                src="assets/images/demos/demo-3/banners/banner-4.jpg"
                alt="banner"
              />
            </a>
          </div>
          {/* End .banner */}
        </div>
        {/* End .col-xl-5col */}
        <div className="col-xl-4-5col">
          <div className="tab-content tab-content-carousel just-action-icons-sm">
            {categoryOption.map((category) => (
              <div
                key={category.id}
                className={`tab-pane p-0 fade ${
                  selectedCategory === category.id ? "show active" : ""
                }`}
                id={`${category.id}-tab`}
                role="tabpanel"
                aria-labelledby={`${category.id}-link`}
              >
                <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow">
                <div className="row">
                  {combinedData.slice(0, 4).map((product, index) => (
                    <ProductItem3 product={product} key={index} />
                  ))}
                      </div>
                </div>
              </div>
            ))}

            {/* .End .tab-pane */}

            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
        </div>
        {/* End .col-xl-4-5col */}
      </div>
      {/* End .row */}
    </div>
  );
}

export default ProductTrending;
