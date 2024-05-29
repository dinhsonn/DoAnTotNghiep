import { useEffect, useState } from "react";
import ProductServices from "../../../services/ProductServices";
import BrandServices from "../../../services/BrandServices";
import CategoryServices from "../../../services/CategoryServices";
import ProductItem3 from "./ProductItem3";
import { useLocation } from "react-router-dom";
function Product() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productValueImages, setProductValueImages] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [productValue, setProductValue] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryOptionValueId = queryParams.get("categoryOptionValueId");
  const [productValueLoaded, setProductValueLoaded] = useState(false);
  useEffect(() => {
    if (categoryOptionValueId) {
      ProductServices.getProductsByCategoryOptionValue(categoryOptionValueId)
        .then((response) => {
          setProductValue(response.data);
          console.log("kkk",response.data)
          setProductValueLoaded(true); 
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      setProductValueLoaded(false);
    }
  }, [categoryOptionValueId]);
  

  useEffect(() => {
    BrandServices.getAll()
      .then((response) => {
        setBrands(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, []);
  useEffect(() => {
    CategoryServices.getAll()
      .then((response) => {
        setCategories(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, productImagesResponse] = await Promise.all([
          ProductServices.getAll(),
          ProductServices.getProductImage(),
        
        ]);
        const productsData = productsResponse.data.content;
        const productImagesData = productImagesResponse.data.content;
        setProducts(productsData);
        setProductImages(productImagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
  useEffect(() => {
    if (productValue.length > 0) {
      ProductServices.getProductImageById(categoryOptionValueId)
        .then((response) => {
          setProductValueImages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product images:", error);
        });
    }
  }, [productValue, categoryOptionValueId]);
  const combinedProductValueData = productValue.map((product) => {
    const correspondingImages = productImages.filter(
      (image) => image.productId.id === product.id && image.sortOrder === 1
    );

    const imageUrls = correspondingImages.map((image) => image.image);

    return {
      ...product,
      image: imageUrls.length > 0 ? imageUrls[0] : null,
    };
  });
  const handleBrandChange = (brandId) => {
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brandId)) {
        return prevSelectedBrands.filter((id) => id !== brandId);
      } else {
        return [...prevSelectedBrands, brandId];
      }
    });
  };
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelectedCategoriess) => {
      if (prevSelectedCategoriess.includes(categoryId)) {
        return prevSelectedCategoriess.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategoriess, categoryId];
      }
    });
  };
  const priceRanges = [
    { id: "price-1", label: "Dưới 1.000.000đ", min: 0, max: 1000000 },
    {
      id: "price-2",
      label: "1.000.000đ - 5.000.000đ",
      min: 1000000,
      max: 5000000,
    },
    {
      id: "price-3",
      label: "5.000.000đ - 15.000.000đ",
      min: 5000000,
      max: 15000000,
    },
    { id: "price-4", label: "Trên 15.000.000đ", min: 15000000, max: Infinity },
  ];
  const handlePriceRangeChange = (id) => {
    setSelectedPriceRanges((prevSelectedPriceRanges) => {
      if (prevSelectedPriceRanges.includes(id)) {
        return prevSelectedPriceRanges.filter((rangeId) => rangeId !== id);
      } else {
        return [...prevSelectedPriceRanges, id];
      }
    });
  };

  const calculateBrandCounts = (products) => {
    const brandCounts = {};
    products.forEach((product) => {
      if (brandCounts[product.brandId.id]) {
        brandCounts[product.brandId.id]++;
      } else {
        brandCounts[product.brandId.id] = 1;
      }
    });
    return brandCounts;
  };
  const calculateCategoriesCounts = (products) => {
    const categoryCounts = {};
    products.forEach((product) => {
      if (categoryCounts[product.categoryId.id]) {
        categoryCounts[product.categoryId.id]++;
      } else {
        categoryCounts[product.categoryId.id] = 1;
      }
    });
    return categoryCounts;
  };

  const brandCounts = calculateBrandCounts(combinedData);
  const categoryCounts = calculateCategoriesCounts(combinedData);
  const filteredProducts = combinedData.filter((product) => {
    const brandMatch =
      selectedBrands.length > 0
        ? selectedBrands.includes(product.brandId.id)
        : true;
    const categoryMatch =
      selectedCategories.length > 0
        ? selectedCategories.includes(product.categoryId.id)
        : true;
    const priceMatch =
      selectedPriceRanges.length > 0
        ? selectedPriceRanges.some((rangeId) => {
            const range = priceRanges.find((r) => r.id === rangeId);
            return product.price >= range.min && product.price < range.max;
          })
        : true;

    return brandMatch && priceMatch && categoryMatch ;
  });

  return (
    <>
      <main className="main">
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Tất cả sản phẩm</a>
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="container">
            <div className="toolbox">
              <div className="toolbox-left">
                <a href="#" className="sidebar-toggler">
                  <i className="icon-bars" />
                  Lọc
                </a>
              </div>
              {/* End .toolbox-left */}
              <div className="toolbox-center">
                <div className="toolbox-info">
                  Hiển thị <span>12 trên 56</span> Sản phẩm
                </div>
                {/* End .toolbox-info */}
              </div>
              {/* End .toolbox-center */}
              <div className="toolbox-right">
                <div className="toolbox-sort">
                  <label htmlFor="sortby">Sắp xếp theo:</label>
                  <div className="select-custom">
                    <select name="sortby" id="sortby" className="form-control">
                      <option value="popularity" selected="selected">
                        Phổ biến
                      </option>
                      <option value="rating">Đánh giá</option>
                      <option value="date">Ngày tháng</option>
                    </select>
                  </div>
                </div>
                {/* End .toolbox-sort */}
              </div>
              {/* End .toolbox-right */}
            </div>
            {/* End .toolbox */}
            <div className="products">
              <div className="row">
              {productValueLoaded
                ? combinedProductValueData.map((combinedItem, index) => (
                    <ProductItem3 product={combinedItem} key={index} />
                  ))
                : filteredProducts.map((combinedItem, index) => (
                    <ProductItem3 product={combinedItem} key={index} />
                  ))}
              </div>
              {/* End .row */}
              <div className="load-more-container text-center">
                <a href="#" className="btn btn-outline-darker btn-load-more">
                  XEM THÊM <i className="icon-refresh" />
                </a>
              </div>
              {/* End .load-more-container */}
            </div>
            {/* End .products */}
            <div className="sidebar-filter-overlay" />
            {/* End .sidebar-filter-overlay */}
            {/* LOC SAN PHAM */}
            <aside className="sidebar-shop sidebar-filter">
              <div className="sidebar-filter-wrapper">
                <div className="widget widget-clean">
                  <label>
                    <i className="icon-close" />
                    Lọc
                  </label>
                  <a href="#" className="sidebar-filter-clear">
                    Xóa tất cả
                  </a>
                </div>
                {/* End .widget */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a
                      data-toggle="collapse"
                      href="#widget-1"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-1"
                    >
                      Hảng
                    </a>
                  </h3>
                  {/* End .widget-title */}
                  <div className="collapse show" id="widget-1">
                    <div className="widget-body">
                      <div className="filter-items filter-items-count">
                        {brands.map((brand, index) => (
                          <div className="filter-item">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`brand-${brand.id}`}
                                checked={selectedBrands.includes(brand.id)}
                                onChange={() => handleBrandChange(brand.id)}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`brand-${brand.id}`}
                              >
                                {brand.name}
                              </label>
                            </div>
                            {/* End .custom-checkbox */}
                            <span className="item-count">
                              {brandCounts[brand.id] || 0}
                            </span>
                          </div>
                        ))}
                        {/* End .filter-item */}
                      </div>
                      {/* End .filter-items */}
                    </div>
                    {/* End .widget-body */}
                  </div>
                  {/* End .collapse */}
                </div>
                {/* End .widget */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a
                      data-toggle="collapse"
                      href="#widget-2"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-2"
                    >
                      Giá tiền
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-2">
                    <div className="widget-body">
                      <div className="filter-items ">
                        {priceRanges.map((range) => (
                          <div className="filter-item " key={range.id}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={range.id}
                                checked={selectedPriceRanges.includes(range.id)}
                                onChange={() =>
                                  handlePriceRangeChange(range.id)
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={range.id}
                              >
                                {range.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* End .widget */}
                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a
                      data-toggle="collapse"
                      href="#widget-4"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-4"
                    >
                      Danh mục sản phẩm
                    </a>
                  </h3>
                  {/* End .widget-title */}
                  <div className="collapse show" id="widget-4">
                    <div className="widget-body">
                      <div className="filter-items filter-items-count">
                        {categories.map((category, index) => (
                          <div className="filter-item">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`brand-${category.id}`}
                                checked={selectedCategories.includes(
                                  category.id
                                )}
                                onChange={() =>
                                  handleCategoryChange(category.id)
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`brand-${category.id}`}
                              >
                                {category.name}
                              </label>
                            </div>
                            <span className="item-count">
                              {categoryCounts[category.id] || 0}
                            </span>
                          </div>
                        ))}
                        {/* End .filter-item */}
                      </div>
                      {/* End .filter-items */}
                    </div>
                    {/* End .widget-body */}
                  </div>
                  {/* End .collapse */}
                </div>
                {/* End .widget */}
              </div>
              {/* End .sidebar-filter-wrapper */}
            </aside>
            {/* End .sidebar-filter */}
          </div>
          {/* End .container */}
        </div>
        {/* End .page-content */}
      </main>
      {/* End .main */}
    </>
  );
}

export default Product;
