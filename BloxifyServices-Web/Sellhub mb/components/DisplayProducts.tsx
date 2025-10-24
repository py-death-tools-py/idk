"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

declare global {
  interface Window {
    PaylixEmbed?: {
      init: () => void;
    };
  }
}

type Product = {
  id: string;
  variantId: string;
  title: string;
  price: number;
  description: string;
  detailedDescription?: string;
  features: string[];
  visible: boolean;
  imageUrl?: string;
  stock: number | string;
  uniqid: string;
  duration: string;
};

type ProductGroup = {
  title: string;
  description: string;
  products: Product[];
};

const DisplayProducts = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const initializePaylix = () => {
    if (window.PaylixEmbed && typeof window.PaylixEmbed.init === 'function') {
      try {
        window.PaylixEmbed.init();
        return true;
      } catch (error) {
        console.error("Error initializing Paylix:", error);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    let scrollDisabled = false;

    const checkForPaylixModal = () => {
      const modalSelectors = [
        '.paylix-modal',
        '.paylix-embed-modal',
        '.paylix-overlay',
        'iframe[src*="paylix"]'
      ];

      let modalVisible = false;

      for (const selector of modalSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          const styles = window.getComputedStyle(element);
          const htmlElement = element as HTMLElement;

          if (styles.display !== 'none' &&
              styles.visibility !== 'hidden' &&
              styles.opacity !== '0' &&
              htmlElement.offsetWidth > 0 &&
              htmlElement.offsetHeight > 0) {
            modalVisible = true;
            break;
          }
        }
      }

      if (modalVisible && !scrollDisabled) {
        document.body.style.overflow = 'hidden';
        scrollDisabled = true;
      } else if (!modalVisible && scrollDisabled) {
        document.body.style.overflow = '';
        scrollDisabled = false;
      }
    };

    const intervalId = setInterval(checkForPaylixModal, 500);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && scrollDisabled) {
        document.body.style.overflow = '';
        scrollDisabled = false;
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, []);

  const extractNumber = (title: string): number => {
    const match = title.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const sortProductsByNumber = (products: Product[]): Product[] => {
    return products.sort((a, b) => {
      const numA = extractNumber(a.title);
      const numB = extractNumber(b.title);
      if (numA !== numB) return numA - numB;
      return a.price - b.price;
    });
  };

  useEffect(() => {
    const fetchPaylixProducts = async () => {
      const apiKey = process.env.NEXT_PUBLIC_PAYLIX_API_KEY;

      if (!apiKey) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://dev.paylix.gg/v1/products`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.data && data.data.products && data.data.products.length > 0) {
          const groupedProducts: { [key: string]: Product[] } = {};

          data.data.products.forEach((product: any) => {
            if (product.private || product.unlisted) return;

            let category = "Other Services";
            const title = product.title.toLowerCase();

            if (title.includes("boost tool v2")) {
              category = "Boost Tool V2";
            } else if (title.includes("boost tool v3")) {
              category = "Boost Tool V3";
            } else if (title.includes("boost bot")) {
              category = "Boost Bot";
            } else if (title.includes("boost") || title.includes("server")) {
              if (title.includes("1 month") || title.includes("30 day") || title.includes("30-day")) {
                category = "1 Month Boosts";
              } else if (title.includes("3 month") || title.includes("90 day") || title.includes("90-day")) {
                category = "3 Month Boosts";
              } else {
                let duration = "1 Month";
                if (product.custom_fields) {
                  const durationField = product.custom_fields.find((field: any) =>
                    field.name && field.name.toLowerCase().includes('duration')
                  );
                  if (durationField && durationField.default) {
                    duration = durationField.default;
                  }
                }

                if (duration.includes("3") || duration.includes("90")) {
                  category = "3 Month Boosts";
                } else {
                  category = "1 Month Boosts";
                }
              }
            } else if (title.includes("token")) {
              category = "Nitro Tokens";
            } else if (title.includes("spotify")) {
              category = "Spotify Accounts";
            } else if (title.includes("nitro")) {
              category = "Discord Nitro";
            } else if (title.includes("member") || title.includes("offline") || title.includes("online")) {
              category = "Discord Members";
            } else if (title.includes("bot") || title.includes("tool")) {
              category = "Tools & Bots";
            }

            if (!groupedProducts[category]) {
              groupedProducts[category] = [];
            }

            let duration = "1 Month";
            if (product.custom_fields) {
              const durationField = product.custom_fields.find((field: any) =>
                field.name && field.name.toLowerCase().includes('duration')
              );
              if (durationField && durationField.default) {
                duration = durationField.default;
              }
            }

            const transformedProduct: Product = {
              id: product.id.toString(),
              variantId: product.uniqid,
              title: product.title,
              price: parseFloat(product.price),
              description: product.description || duration,
              detailedDescription: product.description,
              duration: duration,
              stock: product.stock === -1 ? "8" : product.stock,
              uniqid: product.uniqid,
              features: [],
              visible: true,
              imageUrl: product.image || undefined
            };

            groupedProducts[category].push(transformedProduct);
          });

          const categoryOrder = [
            "1 Month Boosts",
            "3 Month Boosts",
            "Discord Members",
            "Discord Nitro",
            "Nitro Tokens",
            "Spotify Accounts",
            "Boost Tool V2",
            "Boost Tool V3",
            "Boost Bot",
            "Tools & Bots",
            "Other Services"
          ];

          const allProducts: Product[] = [];
          Object.values(groupedProducts).forEach(products => {
            allProducts.push(...products);
          });

          if (allProducts.length > 0) {
            groupedProducts["All Products"] = sortProductsByNumber(allProducts);
          }

          const finalCategoryOrder = ["All Products", ...categoryOrder];

          const transformedGroups: ProductGroup[] = finalCategoryOrder
            .filter(category => groupedProducts[category] && groupedProducts[category].length > 0)
            .map(category => {
              let description = "";
              switch(category) {
                case "All Products":
                  description = "Browse all available products across all categories.";
                  break;
                case "1 Month Boosts":
                  description = "30-day Discord server boosts with premium features and reliable performance.";
                  break;
                case "3 Month Boosts":
                  description = "90-day Discord server boosts for extended premium server enhancements.";
                  break;
                case "Boost Tool V2":
                  description = "Advanced Discord boost tool with order logs and captcha solving capabilities.";
                  break;
                case "Boost Tool V3":
                  description = "Premium Discord boost tool with advanced features and token management.";
                  break;
                case "Boost Bot":
                  description = "Automated Discord boost bot with oAuth and multi-server capabilities.";
                  break;
                case "Discord Nitro":
                  description = "Premium Discord Nitro subscriptions and gifts. Unlock all Discord premium features.";
                  break;
                case "Nitro Tokens":
                  description = "High-quality Discord Nitro tokens for premium access.";
                  break;
                case "Spotify Accounts":
                  description = "Premium Spotify accounts with full access to music streaming.";
                  break;
                case "Discord Members":
                  description = "High-quality members to boost your server's member count permanently.";
                  break;
                case "Tools & Bots":
                  description = "Advanced Discord tools and bots with premium features and reliable performance.";
                  break;
                default:
                  description = `High-quality ${category.toLowerCase()} for your Discord needs.`;
              }

              return {
                title: category,
                description: description,
                products: sortProductsByNumber(groupedProducts[category])
              };
            });

          if (transformedGroups.length > 0) {
            setProductGroups(transformedGroups);
            if (!activeCategory) {
              setActiveCategory(transformedGroups[0].title);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching Paylix products:", error);
        setProductGroups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaylixProducts();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && activeCategory) {
      setTimeout(() => {
        initializePaylix();
      }, 100);
    }
  }, [activeCategory, mounted]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <p className="text-white/70">Please wait</p>
      </div>
    );
  }

  if (!productGroups || productGroups.length === 0) {
    return <div className="px-4 mt-10 text-center text-white/70">No products available</div>;
  }

  if (!mounted) {
    return null;
  }

  const currentCategory = productGroups.find(group => group.title === activeCategory) || productGroups[0];
  const currentProducts = currentCategory?.products || [];

  const handleCategoryChange = (categoryTitle: string) => {
    setActiveCategory(categoryTitle);
    setTimeout(() => {
      initializePaylix();
    }, 100);
  };

  return (
    <>
      <style jsx>{`
        .gradient-border-tab {
          position: relative;
        }

        .gradient-border-tab::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 12px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 100%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          padding: 1px;
          pointer-events: none;
        }
      `}</style>

      <div className="w-full" id="products">
        <div className="flex flex-wrap justify-center h-auto gap-2 mb-8 relative z-10">
          {productGroups.map((group: ProductGroup) => (
            <button
              key={`category-${group.title}`}
              onClick={() => handleCategoryChange(group.title)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ease-in-out border border-white/10 ${
                activeCategory === group.title
                  ? 'text-[#2563eb]'
                  : 'text-white/70 hover:text-white/90 gradient-border-tab'
              }`}
              style={{
                backgroundColor: '#0e0e0e'
              }}
            >
              {group.title}
            </button>
          ))}
        </div>

        <div className="w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 w-full max-w-[1600px] mx-auto px-4">
            {currentProducts.map((product, productIndex) => (
              <div key={`product-${product.uniqid}-${productIndex}-${activeCategory}`}>
                <ProductCard
                  product={product}
                  index={productIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayProducts;