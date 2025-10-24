import React from "react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  price: number;
  visible: boolean;
  features: string[];
  imageUrl?: string;
  stock?: number | string;
  uniqid?: string;
  duration?: string;
  variantId?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
}) => {
  const getProductImage = (title: string): string => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('boost tool v2')) {
      if (lowerTitle.includes('lifetime')) {
        return '/Product/btv2l.gif';
      } else if (lowerTitle.includes('day') && !lowerTitle.includes('month')) {
        return '/Product/btv2d.gif';
      } else if (lowerTitle.includes('week')) {
        return '/Product/btv2w.gif';
      } else if (lowerTitle.includes('1 month') || lowerTitle.includes('month')) {
        return '/Product/btv2m.gif';
      }
    }

    if (lowerTitle.includes('boost tool v3')) {
      if (lowerTitle.includes('lifetime')) {
        return '/Product/btv3l.gif';
      } else if (lowerTitle.includes('1 month') || lowerTitle.includes('month')) {
        return '/Product/btv3m.gif';
      }
    }

    if (lowerTitle.includes('boost bot')) {
      if (lowerTitle.includes('lifetime')) {
        return '/Product/bbl.gif';
      } else if (lowerTitle.includes('1 month') || lowerTitle.includes('month')) {
        return '/Product/bbm.gif';
      }
    }

    if (lowerTitle.includes('discord nitro') || (lowerTitle.includes('nitro') && !lowerTitle.includes('token'))) {
      if (lowerTitle.includes('3 month') || lowerTitle.includes('3-month')) {
        return '/Product/dn3.gif';
      } else if (lowerTitle.includes('1 month') || lowerTitle.includes('1-month') || lowerTitle.includes('gift')) {
        return '/Product/dn1.gif';
      }
    }

    if (lowerTitle.includes('nitro token')) {
      return '/Product/1mt.gif';
    }

    if (lowerTitle.includes('spotify')) {
      return '/Product/Spotify.gif';
    }

    if (lowerTitle.includes('member') || lowerTitle.includes('offline') || lowerTitle.includes('online')) {
      if (lowerTitle.includes('online')) {
        return '/Product/online.gif';
      } else {
        return '/Product/offline.gif';
      }
    }

    if (lowerTitle.includes('boost') && !lowerTitle.includes('tool') && !lowerTitle.includes('bot')) {
      if (lowerTitle.includes('3 month') || lowerTitle.includes('3-month')) {
        return '/Product/3m.gif';
      } else if (lowerTitle.includes('1 month') || lowerTitle.includes('1-month') || lowerTitle.includes('month')) {
        return '/Product/1m.gif';
      }

      return '/Product/1m.gif';
    }

    return '';
  };

  const isOutOfStock = product.stock !== undefined && Number(product.stock) === 0;

  const productImagePath = getProductImage(product.title);

  return (
    <>
      <style jsx>{`
        .gradient-border-wrapper {
          position: relative;
        }

        .gradient-border-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 6px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 100%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          padding: 1px;
          pointer-events: none;
        }

        .product-card-container {
          position: relative;
          transition: transform 0.3s ease;
        }

        .product-card-container:hover {
          transform: translateY(-5px);
        }

        .hover-purchase-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 10;
          pointer-events: none;
        }

        .product-card-container:hover .hover-purchase-button {
          opacity: 1;
          pointer-events: auto;
        }

        .product-card-container:hover .product-image {
          filter: brightness(0.7);
        }

        .product-image {
          transition: filter 0.3s ease;
        }

        @media (max-width: 640px) {
          .gradient-border-wrapper::before {
            display: none;
          }

          .product-card-container {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
          }

          .product-image {
            max-height: 200px;
          }

          .product-content {
            padding: 12px;
          }

          .hover-purchase-button {
            position: static;
            opacity: 1;
            transform: none;
            pointer-events: auto;
            margin-top: 1rem;
          }

          .product-card-container:hover .product-image {
            filter: none;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut"
        }}
        className="product-card-container flex flex-col h-fit w-full max-w-[320px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[460px] relative mx-auto"
      >
        <div className="gradient-border-wrapper w-full" style={{ borderRadius: '6px' }}>
          {productImagePath && (
            <div className="flex justify-center bg-transparent overflow-hidden w-full relative" style={{ borderRadius: '6px 6px 0 0' }}>
              <img
                src={productImagePath}
                alt={product.title}
                className="product-image w-full h-auto max-h-96 sm:max-h-96 object-contain select-none pointer-events-none"
                draggable={false}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div
            className="product-content backdrop-blur-sm p-3 sm:p-3 w-full"
            style={{ backgroundColor: '#0e0e0e', borderRadius: '0 0 6px 6px' }}
          >
            <div className="flex justify-between items-start mb-4 sm:mb-8 gap-2">
              <h3 className="text-lg sm:text-xl font-medium text-white flex-1 leading-tight">{product.title}</h3>
              <div className="text-sm text-white/50 flex-shrink-0">
                Stock: {typeof product?.stock === 'string' && product.stock === "∞" ? (
                  <span className="text-white">∞</span>
                ) : (
                  <span className="text-white">
                    {product?.stock}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-auto w-full">
              <div className="flex items-center justify-between gap-3">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </div>
                
                <div className="flex-shrink-0">
                  <button
                    className={`group relative overflow-hidden bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#2563eb]/25 border-2 border-t-[#3b82f6] border-x-[#2563eb] border-b-[#1d4ed8] rounded-xl font-medium px-3 py-2 text-sm flex items-center justify-center whitespace-nowrap ${
                      isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    data-paylixecommerce-product={product?.uniqid}
                    type="button"
                    disabled={isOutOfStock}
                  >
                    <span className="relative z-10">
                      {isOutOfStock ? "Out of Stock" : "Purchase"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;