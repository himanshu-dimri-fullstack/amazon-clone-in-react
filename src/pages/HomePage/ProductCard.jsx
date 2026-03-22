import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    const finalPrice = product.price - (product.discount || 0);

    const limitChars = (text, limit) => {
        if (text.length <= limit) return text;
        return text.slice(0, limit) + "...";
    };

    return (
        <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition duration-300">

            <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                Keep Shopping For Smartphones
            </h2>

            <Link to={`/${product.subSlug}/${product.slug}`}>
                <div className="flex justify-center overflow-hidden">
                    <img
                        src={selectedImage}
                        className="h-30 sm:h-48 object-contain transition-transform duration-300 hover:scale-110"
                    />
                </div>
            </Link>

            <Link to={`/${product.subSlug}/${product.slug}`}>
                <p className="mt-3 text-sm font-semibold leading-5 min-h-10">
                    {limitChars(product.title, 45)}
                </p>
            </Link>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-lg sm:text-xl font-semibold text-black">
                    ₹{finalPrice}
                </span>

                <span className="text-sm text-[#565959]">MRP:</span>

                <span className="line-through text-sm">
                    ₹{product.price}
                </span>
            </div>

            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        onClick={() => setSelectedImage(img)}
                        className={`min-w-15 h-14 object-contain rounded-lg cursor-pointer border transition
                        ${selectedImage === img
                                ? "border-2 border-[#2162a1]"
                                : "border-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductCard;