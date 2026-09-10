import type { Product, Order, Invoice, RentalBooking, Customer, InventoryItem } from '../types';

/*
  IMAGE STRATEGY:
  All images sourced from Unsplash (free commercial use).
  Selected to represent Indian women's ethnic + western boutique fashion.
  Organized by category for editorial sections.
*/
export const products: Product[] = [
  // === ETHNIC: LEHENGAS ===
  {
    id: '1', name: 'Royal Bridal Lehenga', sku: 'RK-LH-001', category: 'Lehenga', type: 'both',
    salePrice: 29999, rentalPrice: 4999, deposit: 10000, totalStock: 8, available: 3, sold: 2, rented: 3, reserved: 0,
    image: 'https://images.wholesalesalwar.com/2024y/November/53689/Red-Velvet-Bridal%20Wear-Dori%20Work-Lehenga%20Choli-RIWAYAT-3075-A%20%282%29.jpg',
    images: ['https://images.wholesalesalwar.com/2024y/November/53689/Red-Velvet-Bridal%20Wear-Dori%20Work-Lehenga%20Choli-RIWAYAT-3075-A%20%282%29.jpg '],
    status: 'active', featured: true, newArrival: false,
    description: 'Stunning Royal Bridal Lehenga with intricate zardozi embroidery, adorned with crystals and sequins. Self-shimmer fabric with silk bandhani patchwork and hand embellishments. Perfect for wedding ceremonies and grand receptions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Red', 'Maroon', 'Gold', 'Wine'],
    careInstructions: 'Dry clean only. Store in garment bag. Avoid direct sunlight.',
  },
  {
    id: '2', name: 'Designer Party Gown', sku: 'RK-GW-002', category: 'Gown', type: 'both',
    salePrice: 18999, rentalPrice: 2999, deposit: 5000, totalStock: 12, available: 2, sold: 4, rented: 6, reserved: 0,
    image: 'https://rosiohouse.com/cdn/shop/files/designer-neelam-navy-blue-party-gown-6325162.jpg?v=1758034809&width=3840',
    images: ['https://rosiohouse.com/cdn/shop/files/designer-neelam-navy-blue-party-gown-6325162.jpg?v=1758034809&width=3840'],
    status: 'low_stock', featured: true, newArrival: false,
    description: 'Elegant designer party gown with flowing silhouette. Features delicate lace work and a flattering empire waistline. Available in sizes 36-46.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'Emerald', 'Blush'],
    careInstructions: 'Dry clean recommended. Steam gently to remove wrinkles.',
  },
  {
    id: '3', name: 'Midnight Blue Sequin Gown', sku: 'RK-GW-003', category: 'Gown', type: 'retail',
    salePrice: 15999, rentalPrice: 0, deposit: 0, totalStock: 6, available: 4, sold: 2, rented: 0, reserved: 0,
    image: 'https://img.perniaspopupshop.com/catalog/product/m/c/MCDL0225142_1.jpg?impolicy=detailimageprod',
    images: ['https://img.perniaspopupshop.com/catalog/product/m/c/MCDL0225142_1.jpg?impolicy=detailimageprod'],
    status: 'active', featured: false, newArrival: true,
    description: 'Glamorous midnight blue sequin gown that catches the light beautifully. Perfect for cocktail parties and evening events.',
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Midnight Blue', 'Royal Blue'],
    careInstructions: 'Hand wash cold. Do not bleach. Hang dry.',
  },
  // === ETHNIC: SAREES ===
  {
    id: '4', name: 'Designer Silk Saree', sku: 'RK-SR-004', category: 'Saree', type: 'both',
    salePrice: 12999, rentalPrice: 1999, deposit: 4000, totalStock: 15, available: 8, sold: 3, rented: 4, reserved: 0,
    image: 'https://www.hatkay.com/cdn/shop/files/Beige_Cream_Designer_Saree_8209.jpg?v=1772573969&width=1445',
    images: ['https://www.hatkay.com/cdn/shop/files/Beige_Cream_Designer_Saree_8209.jpg?v=1772573969&width=1445'],
    status: 'active', featured: true, newArrival: false,
    description: 'Beautiful designer silk saree with intricate border work and pallu design. Comes with matching blouse piece. Self-shimmer fabric with hand embellishments.',
    sizes: ['Free Size'], colors: ['Pink', 'Green', 'Blue', 'Gold', 'Red'],
    careInstructions: 'Dry clean only. Fold neatly with tissue paper between layers.',
  },
  // === ETHNIC: SUITS ===
  {
    id: '5', name: 'Mauve Embroidered Suit', sku: 'RK-SU-005', category: 'Suit', type: 'retail',
    salePrice: 8999, rentalPrice: 0, deposit: 0, totalStock: 10, available: 6, sold: 4, rented: 0, reserved: 0,
    image: 'https://www.shopethnos.com/cdn/shop/products/17091.jpg?v=1742767806',
    images: ['https://www.shopethnos.com/cdn/shop/products/17091.jpg?v=1742767806'],
    status: 'active', featured: false, newArrival: false,
    description: 'Graceful mauve embroidered suit set with churidar and dupatta. Delicate threadwork adorns the neckline and hem. Sizes 36-46.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Mauve', 'Dusty Rose', 'Lavender'],
    careInstructions: 'Gentle machine wash or dry clean. Iron on low heat.',
  },
  // === ETHNIC: SHERWANI ===
  {
    id: '6', name: 'Wedding Sherwani', sku: 'RK-SH-003', category: 'Sherwani', type: 'both',
    salePrice: 24999, rentalPrice: 3999, deposit: 8000, totalStock: 6, available: 1, sold: 1, rented: 4, reserved: 0,
    image: 'https://dcfashion.in/cdn/shop/files/SubtleIvoryPearlReshamWorkGroomSherwani.jpg?v=1712558874',
    images: ['https://dcfashion.in/cdn/shop/files/SubtleIvoryPearlReshamWorkGroomSherwani.jpg?v=1712558874'],
    status: 'low_stock', featured: true, newArrival: false,
    description: 'Magnificent wedding sherwani with heavy embroidery and brocade work. Includes matching churidar and stole.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Gold', 'Ivory', 'Maroon'],
    careInstructions: 'Professional dry clean only. Store in breathable garment bag.',
  },
  // === INDO-WESTERN ===
  {
    id: '7', name: 'Indo-Western Fusion Set', sku: 'RK-IW-007', category: 'Indo-Western', type: 'both',
    salePrice: 14999, rentalPrice: 2499, deposit: 5000, totalStock: 9, available: 5, sold: 2, rented: 2, reserved: 0,
    image: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: ['https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=900'],
    status: 'active', featured: false, newArrival: true,
    description: 'Contemporary Indo-Western fusion set blending traditional elegance with modern style. Ideal for sangeet and reception.',
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'White'],
    careInstructions: 'Dry clean recommended. Store folded in cool dry place.',
  },
  // === KIDS ===
  {
    id: '8', name: 'Kids Party Wear', sku: 'RK-KP-008', category: 'Kids', type: 'retail',
    salePrice: 3999, rentalPrice: 0, deposit: 0, totalStock: 20, available: 14, sold: 6, rented: 0, reserved: 0,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: ['https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=900'],
    status: 'active', featured: false, newArrival: false,
    description: 'Adorable kids party wear collection. Comfortable yet stylish designs for your little ones special occasions.',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'], colors: ['Pink', 'Blue', 'Yellow', 'White'],
    careInstructions: 'Machine washable. Tumble dry low. Iron on medium heat.',
  },
  // === RENTAL: GOWNS ===
  {
    id: '9', name: 'Reception Gown', sku: 'RK-GW-009', category: 'Gown', type: 'rental',
    salePrice: 0, rentalPrice: 3499, deposit: 7000, totalStock: 5, available: 0, sold: 0, rented: 4, reserved: 1,
    image: 'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: ['https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=900'],
    status: 'low_stock', featured: false, newArrival: false,
    description: 'Luxurious reception gown with floor-length tulle skirt and hand-beaded bodice. Show-stopping piece for grand celebrations.',
    sizes: ['XS', 'S', 'M', 'L'], colors: ['Champagne', 'Blush', 'Ivory'],
    careInstructions: 'Professional cleaning only. Hang to prevent wrinkles.',
  },
  // === ETHNIC: ANARKALI ===
  {
    id: '10', name: 'Anarkali Suit', sku: 'RK-AN-010', category: 'Suit', type: 'both',
    salePrice: 11999, rentalPrice: 1799, deposit: 3500, totalStock: 14, available: 9, sold: 3, rented: 2, reserved: 0,
    image: 'https://images.pexels.com/photos/12674254/pexels-photo-12674254.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: ['https://images.pexels.com/photos/12674254/pexels-photo-12674254.jpeg?auto=compress&cs=tinysrgb&w=900'],
    status: 'active', featured: false, newArrival: false,
    description: 'Classic Anarkali suit with contemporary styling. Flattering A-line silhouette with intricate mirror work and embroidery. Sizes 36-46.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Teal', 'Coral', 'Yellow', 'White'],
    careInstructions: 'Dry clean for best results. Store flat or hanging.',
  },
  // === ETHNIC: BANARASI ===
  {
    id: '11', name: 'Silk Banarasi Saree', sku: 'RK-SR-011', category: 'Saree', type: 'retail',
    salePrice: 16999, rentalPrice: 0, deposit: 0, totalStock: 8, available: 5, sold: 3, rented: 0, reserved: 0,
    image: 'https://images.pexels.com/photos/15783281/pexels-photo-15783281.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: ['https://images.pexels.com/photos/15783281/pexels-photo-15783281.jpeg?auto=compress&cs=tinysrgb&w=900'],
    status: 'active', featured: true, newArrival: true,
    description: 'Authentic Banarasi silk saree with gold zari work. A timeless heirloom piece for weddings and festive occasions.',
    sizes: ['Free Size'], colors: ['Red', 'Green', 'Gold', 'Blue'],
    careInstructions: 'Dry clean only. Store in muslin cloth. Refold periodically.',
  },
  // === RENTAL: TUXEDO ===
  {
    id: '12', name: 'Classic Black Tuxedo', sku: 'RK-TX-012', category: 'Suit', type: 'both',
    salePrice: 19999, rentalPrice: 2999, deposit: 6000, totalStock: 7, available: 3, sold: 2, rented: 2, reserved: 0,
    image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: ['https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=900'],
    status: 'active', featured: false, newArrival: false,
    description: 'Sophisticated classic black tuxedo with satin lapels. Includes matching trousers, bow tie, and pocket square.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'Navy'],
    careInstructions: 'Dry clean only. Hang on wide hanger. Use garment bag.',
  },
];
// export const products: Product[] = [
//   // === ETHNIC: LEHENGAS ===
//   {
//     id: '1', name: 'Royal Bridal Lehenga', sku: 'RK-LH-001', category: 'Lehenga', type: 'both',
//     salePrice: 29999, rentalPrice: 4999, deposit: 10000, totalStock: 8, available: 3, sold: 2, rented: 3, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=900&h=1200&fit=crop&auto=format'],
//     status: 'active', featured: true, newArrival: false,
//     description: 'Stunning Royal Bridal Lehenga with intricate zardozi embroidery, adorned with crystals and sequins. Self-shimmer fabric with silk bandhani patchwork and hand embellishments. Perfect for wedding ceremonies and grand receptions.',
//     sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Red', 'Maroon', 'Gold', 'Wine'],
//     careInstructions: 'Dry clean only. Store in garment bag. Avoid direct sunlight.',
//   },
//   {
//     id: '2', name: 'Designer Party Gown', sku: 'RK-GW-002', category: 'Gown', type: 'both',
//     salePrice: 18999, rentalPrice: 2999, deposit: 5000, totalStock: 12, available: 2, sold: 4, rented: 6, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&h=1200&fit=crop&auto=format'],
//     status: 'low_stock', featured: true, newArrival: false,
//     description: 'Elegant designer party gown with flowing silhouette. Features delicate lace work and a flattering empire waistline. Available in sizes 36-46.',
//     sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'Emerald', 'Blush'],
//     careInstructions: 'Dry clean recommended. Steam gently to remove wrinkles.',
//   },
//   {
//     id: '3', name: 'Midnight Blue Sequin Gown', sku: 'RK-GW-003', category: 'Gown', type: 'retail',
//     salePrice: 15999, rentalPrice: 0, deposit: 0, totalStock: 6, available: 4, sold: 2, rented: 0, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&h=1200&fit=crop&auto=format'],
//     status: 'active', featured: false, newArrival: true,
//     description: 'Glamorous midnight blue sequin gown that catches the light beautifully. Perfect for cocktail parties and evening events.',
//     sizes: ['S', 'M', 'L', 'XL'], colors: ['Midnight Blue', 'Royal Blue'],
//     careInstructions: 'Hand wash cold. Do not bleach. Hang dry.',
//   },
//   // === ETHNIC: SAREES ===
//   {
//     id: '4', name: 'Designer Silk Saree', sku: 'RK-SR-004', category: 'Saree', type: 'both',
//     salePrice: 12999, rentalPrice: 1999, deposit: 4000, totalStock: 15, available: 8, sold: 3, rented: 4, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1200&fit=crop&auto=format'],
//     status: 'active', featured: true, newArrival: false,
//     description: 'Beautiful designer silk saree with intricate border work and pallu design. Comes with matching blouse piece. Self-shimmer fabric with hand embellishments.',
//     sizes: ['Free Size'], colors: ['Pink', 'Green', 'Blue', 'Gold', 'Red'],
//     careInstructions: 'Dry clean only. Fold neatly with tissue paper between layers.',
//   },
//   // === ETHNIC: SUITS ===
//   {
//     id: '5', name: 'Mauve Embroidered Suit', sku: 'RK-SU-005', category: 'Suit', type: 'retail',
//     salePrice: 8999, rentalPrice: 0, deposit: 0, totalStock: 10, available: 6, sold: 4, rented: 0, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=900&h=1200&fit=crop&auto=format'],
//     status: 'active', featured: false, newArrival: false,
//     description: 'Graceful mauve embroidered suit set with churidar and dupatta. Delicate threadwork adorns the neckline and hem. Sizes 36-46.',
//     sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Mauve', 'Dusty Rose', 'Lavender'],
//     careInstructions: 'Gentle machine wash or dry clean. Iron on low heat.',
//   },
//   // === ETHNIC: SHARWANI ===
//   {
//     id: '6', name: 'Wedding Sherwani', sku: 'RK-SH-003', category: 'Sherwani', type: 'both',
//     salePrice: 24999, rentalPrice: 3999, deposit: 8000, totalStock: 6, available: 1, sold: 1, rented: 4, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=900&h=1200&fit=crop&auto=format'],
//     status: 'low_stock', featured: true, newArrival: false,
//     description: 'Magnificent wedding sherwani with heavy embroidery and brocade work. Includes matching churidar and stole.',
//     sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Gold', 'Ivory', 'Maroon'],
//     careInstructions: 'Professional dry clean only. Store in breathable garment bag.',
//   },
//   // === INDO-WESTERN ===
//   {
//     id: '7', name: 'Indo-Western Fusion Set', sku: 'RK-IW-007', category: 'Indo-Western', type: 'both',
//     salePrice: 14999, rentalPrice: 2499, deposit: 5000, totalStock: 9, available: 5, sold: 2, rented: 2, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=900&h=1200&fit=crop&auto=format'],
//     status: 'active', featured: false, newArrival: true,
//     description: 'Contemporary Indo-Western fusion set blending traditional elegance with modern style. Ideal for sangeet and reception.',
//     sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'White'],
//     careInstructions: 'Dry clean recommended. Store folded in cool dry place.',
//   },
//   // === KIDS ===
//   {
//     id: '8', name: 'Kids Party Wear', sku: 'RK-KP-008', category: 'Kids', type: 'retail',
//     salePrice: 3999, rentalPrice: 0, deposit: 0, totalStock: 20, available: 14, sold: 6, rented: 0, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=900&h=1200&fit=crop&auto=format'],
//     status: 'active', featured: false, newArrival: false,
//     description: 'Adorable kids party wear collection. Comfortable yet stylish designs for your little ones special occasions.',
//     sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'], colors: ['Pink', 'Blue', 'Yellow', 'White'],
//     careInstructions: 'Machine washable. Tumble dry low. Iron on medium heat.',
//   },
//   // === RENTAL: GOWNS ===
//   {
//     id: '9', name: 'Reception Gown', sku: 'RK-GW-009', category: 'Gown', type: 'rental',
//     salePrice: 0, rentalPrice: 3499, deposit: 7000, totalStock: 5, available: 0, sold: 0, rented: 4, reserved: 1,
//     image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&h=1200&fit=crop&auto=format'],
//     status: 'low_stock', featured: false, newArrival: false,
//     description: 'Luxurious reception gown with floor-length tulle skirt and hand-beaded bodice. Show-stopping piece for grand celebrations.',
//     sizes: ['XS', 'S', 'M', 'L'], colors: ['Champagne', 'Blush', 'Ivory'],
//     careInstructions: 'Professional cleaning only. Hang to prevent wrinkles.',
//   },
//   // === ETHNIC: ANARKALI ===
//   {
//     id: '10', name: 'Anarkali Suit', sku: 'RK-AN-010', category: 'Suit', type: 'both',
//     salePrice: 11999, rentalPrice: 1799, deposit: 3500, totalStock: 14, available: 9, sold: 3, rented: 2, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&h=1200&fit=crop&auto=format'],
//     status: 'active', featured: false, newArrival: false,
//     description: 'Classic Anarkali suit with contemporary styling. Flattering A-line silhouette with intricate mirror work and embroidery. Sizes 36-46.',
//     sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Teal', 'Coral', 'Yellow', 'White'],
//     careInstructions: 'Dry clean for best results. Store flat or hanging.',
//   },
//   // === ETHNIC: BANARASI ===
//   {
//     id: '11', name: 'Silk Banarasi Saree', sku: 'RK-SR-011', category: 'Saree', type: 'retail',
//     salePrice: 16999, rentalPrice: 0, deposit: 0, totalStock: 8, available: 5, sold: 3, rented: 0, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&h=1200&fit=crop&auto=format'],
//     status: 'active', featured: true, newArrival: true,
//     description: 'Authentic Banarasi silk saree with gold zari work. A timeless heirloom piece for weddings and festive occasions.',
//     sizes: ['Free Size'], colors: ['Red', 'Green', 'Gold', 'Blue'],
//     careInstructions: 'Dry clean only. Store in muslin cloth. Refold periodically.',
//   },
//   // === RENTAL: TUXEDO ===
//   {
//     id: '12', name: 'Classic Black Tuxedo', sku: 'RK-TX-012', category: 'Suit', type: 'both',
//     salePrice: 19999, rentalPrice: 2999, deposit: 6000, totalStock: 7, available: 3, sold: 2, rented: 2, reserved: 0,
//     image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop&auto=format',
//     images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&h=1200&fit=crop&auto=format'],
//     status: 'active', featured: false, newArrival: false,
//     description: 'Sophisticated classic black tuxedo with satin lapels. Includes matching trousers, bow tie, and pocket square.',
//     sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'Navy'],
//     careInstructions: 'Dry clean only. Hang on wide hanger. Use garment bag.',
//   },
// ];

/* ===== EDITORIAL IMAGE ASSETS — Curated Indian Fashion ===== */
export const editorialImages = {
  // Hero — Indian bridal/fashion editorial
  hero: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&h=1080&fit=crop&auto=format&q=85',
  heroMobile: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1400&fit=crop&auto=format&q=80',

  // Category tiles — distinct Indian fashion images
  ethnic: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop&auto=format',
  western: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&auto=format',
  bridal: 'https://images.unsplash.com/photo-1594633313593-bab3885e2a26?w=800&h=1000&fit=crop&auto=format',
  party: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1000&fit=crop&auto=format',
  rental: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&auto=format',

  // Lookbook — asymmetric editorial
  lookbookWedding: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=800&fit=crop&auto=format',
  lookbookParty1: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=750&fit=crop&auto=format',
  lookbookParty2: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop&auto=format',
  lookbookEvening: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&h=600&fit=crop&auto=format',
  lookbookEthnic: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=1100&fit=crop&auto=format',

  // Shop/Rent panels
  shopPanel: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1200&fit=crop&auto=format',
  rentPanel: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&h=1200&fit=crop&auto=format',

  // Featured look
  featured: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&h=900&fit=crop&auto=format',

  // Ethnic edit — Indian fashion
  ethnicEdit1: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop&auto=format',
  ethnicEdit2: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&auto=format',
  ethnicEdit3: 'https://images.unsplash.com/photo-1594633313593-bab3885e2a26?w=600&h=800&fit=crop&auto=format',

  // Western edit — gowns & dresses
  westernEdit1: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop&auto=format',
  westernEdit2: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop&auto=format',
  westernEdit3: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&auto=format',

  // Rental campaign
  rentalCampaign: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&h=800&fit=crop&auto=format',

  // Occasion images — Indian fashion for each occasion
  occWedding: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=650&fit=crop&auto=format',
  occReception: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=650&fit=crop&auto=format',
  occSangeet: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=650&fit=crop&auto=format',
  occFestive: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=650&fit=crop&auto=format',
  occParty: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=650&fit=crop&auto=format',
  occEngagement: 'https://images.unsplash.com/photo-1594633313593-bab3885e2a26?w=500&h=650&fit=crop&auto=format',
  occBridal: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=650&fit=crop&auto=format',
  occDateNight: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=650&fit=crop&auto=format',

  // Final CTA
  finalCta: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&h=800&fit=crop&auto=format&q=80',
};

export const inventoryItems: InventoryItem[] = products.map(p => ({
  productId: p.id, productName: p.name, sku: p.sku, category: p.category,
  retailStock: p.type === 'rental' ? 0 : Math.floor(p.totalStock * 0.6),
  rentalStock: p.type === 'retail' ? 0 : Math.ceil(p.totalStock * 0.4),
  total: p.totalStock, available: p.available, sold: p.sold, rented: p.rented, reserved: p.reserved,
  status: p.status === 'out_of_stock' ? 'Out of Stock' : p.status === 'low_stock' ? 'Low Stock' : 'Available',
}));

export const initialOrders: Order[] = [
  {
    id: 'RK-2026-1042', customerId: '1', customerName: 'Aditi Sharma', customerPhone: '98XXX-XXX-10', customerEmail: 'aditi@email.com',
    items: [
      { productId: '1', productName: 'Royal Bridal Lehenga', quantity: 1, price: 29999, discount: 2000, type: 'retail' },
      { productId: '8', productName: 'Kids Party Wear', quantity: 1, price: 3999, discount: 0, type: 'retail' },
    ],
    orderType: 'retail', subtotal: 31998, tax: 5759, discount: 2000, rentalCharges: 0, securityDeposit: 0,
    total: 35757, paymentStatus: 'paid', orderStatus: 'delivered', paymentMethod: 'UPI', date: '2026-09-10',
    timeline: [
      { status: 'Order Placed', date: '2026-09-10 10:00 AM', done: true },
      { status: 'Payment Received', date: '2026-09-10 10:02 AM', done: true },
      { status: 'Confirmed', date: '2026-09-10 10:30 AM', done: true },
      { status: 'Preparing', date: '2026-09-10 02:00 PM', done: true },
      { status: 'Ready for Delivery', date: '2026-09-10 04:00 PM', done: true },
      { status: 'Delivered', date: '2026-09-10 05:00 PM', done: true },
      { status: 'Completed', date: '', done: false },
    ],
  },
  {
    id: 'RK-2026-1041', customerId: '2', customerName: 'Riya Verma', customerPhone: '98XXX-XXX-20',
    items: [{ productId: '3', productName: 'Midnight Blue Sequin Gown', quantity: 1, price: 15999, discount: 0, type: 'retail' }],
    orderType: 'retail', subtotal: 15999, tax: 2880, discount: 0, rentalCharges: 0, securityDeposit: 0,
    total: 18879, paymentStatus: 'paid', orderStatus: 'confirmed', paymentMethod: 'Cash', date: '2026-09-10',
    timeline: [
      { status: 'Order Placed', date: '2026-09-10 11:00 AM', done: true },
      { status: 'Payment Received', date: '2026-09-10 11:05 AM', done: true },
      { status: 'Confirmed', date: '2026-09-10 11:30 AM', done: true },
      { status: 'Preparing', date: '', done: false },
      { status: 'Ready for Delivery', date: '', done: false },
      { status: 'Delivered', date: '', done: false },
      { status: 'Completed', date: '', done: false },
    ],
  },
  {
    id: 'RK-2026-1040', customerId: '3', customerName: 'Sneha Kapoor', customerPhone: '98XXX-XXX-30',
    items: [
      { productId: '5', productName: 'Mauve Embroidered Suit', quantity: 1, price: 8999, discount: 500, type: 'retail' },
      { productId: '4', productName: 'Designer Silk Saree', quantity: 1, price: 1999, discount: 0, type: 'rental', rentalStart: '2026-09-11', rentalEnd: '2026-09-13', rentalDays: 2, deposit: 4000 },
    ],
    orderType: 'mixed', subtotal: 10998, tax: 1979, discount: 500, rentalCharges: 3998, securityDeposit: 4000,
    total: 20476, paymentStatus: 'partial', orderStatus: 'preparing', paymentMethod: 'Card', date: '2026-09-09',
    timeline: [
      { status: 'Order Placed', date: '2026-09-09 02:00 PM', done: true },
      { status: 'Payment Received', date: '2026-09-09 02:05 PM', done: true },
      { status: 'Confirmed', date: '2026-09-09 03:00 PM', done: true },
      { status: 'Preparing', date: '2026-09-10 10:00 AM', done: true },
      { status: 'Ready for Pickup', date: '', done: false },
      { status: 'Rental Active', date: '', done: false },
      { status: 'Completed', date: '', done: false },
    ],
  },
  {
    id: 'RK-2026-1039', customerId: '4', customerName: 'Meera Jain', customerPhone: '98XXX-XXX-40',
    items: [{ productId: '10', productName: 'Anarkali Suit', quantity: 1, price: 11999, discount: 1000, type: 'retail' }],
    orderType: 'retail', subtotal: 10999, tax: 1980, discount: 1000, rentalCharges: 0, securityDeposit: 0,
    total: 11979, paymentStatus: 'paid', orderStatus: 'delivered', paymentMethod: 'UPI', date: '2026-09-09',
    timeline: [
      { status: 'Order Placed', date: '2026-09-09 09:00 AM', done: true },
      { status: 'Payment Received', date: '2026-09-09 09:02 AM', done: true },
      { status: 'Confirmed', date: '2026-09-09 09:30 AM', done: true },
      { status: 'Preparing', date: '2026-09-09 01:00 PM', done: true },
      { status: 'Ready for Delivery', date: '2026-09-09 03:00 PM', done: true },
      { status: 'Delivered', date: '2026-09-09 04:00 PM', done: true },
      { status: 'Completed', date: '', done: false },
    ],
  },
  {
    id: 'RK-2026-1038', customerId: '5', customerName: 'Priya Gupta', customerPhone: '98XXX-XXX-50',
    items: [{ productId: '12', productName: 'Classic Black Tuxedo', quantity: 1, price: 2999, discount: 0, type: 'rental', rentalStart: '2026-09-08', rentalEnd: '2026-09-10', rentalDays: 2, deposit: 6000 }],
    orderType: 'rental', subtotal: 2999, tax: 540, discount: 0, rentalCharges: 5998, securityDeposit: 6000,
    total: 14537, paymentStatus: 'paid', orderStatus: 'rental_active', paymentMethod: 'Cash', date: '2026-09-08',
    timeline: [
      { status: 'Order Placed', date: '2026-09-08 11:00 AM', done: true },
      { status: 'Payment Received', date: '2026-09-08 11:05 AM', done: true },
      { status: 'Confirmed', date: '2026-09-08 11:30 AM', done: true },
      { status: 'Preparing', date: '2026-09-08 03:00 PM', done: true },
      { status: 'Ready for Pickup', date: '2026-09-08 04:00 PM', done: true },
      { status: 'Rental Active', date: '2026-09-08 05:00 PM', done: true },
      { status: 'Completed', date: '', done: false },
    ],
  },
  {
    id: 'RK-2026-1037', customerId: '6', customerName: 'Neha Singh', customerPhone: '98XXX-XXX-60',
    items: [{ productId: '2', productName: 'Designer Party Gown', quantity: 1, price: 18999, discount: 2000, type: 'retail' }],
    orderType: 'retail', subtotal: 16999, tax: 3060, discount: 2000, rentalCharges: 0, securityDeposit: 0,
    total: 18059, paymentStatus: 'unpaid', orderStatus: 'pending', paymentMethod: '', date: '2026-09-10',
    timeline: [
      { status: 'Order Placed', date: '2026-09-10 01:00 PM', done: true },
      { status: 'Payment Received', date: '', done: false },
      { status: 'Confirmed', date: '', done: false },
      { status: 'Preparing', date: '', done: false },
      { status: 'Ready for Delivery', date: '', done: false },
      { status: 'Delivered', date: '', done: false },
      { status: 'Completed', date: '', done: false },
    ],
  },
];

export const initialInvoices: Invoice[] = [
  { id: 'INV-2042', orderId: 'RK-2026-1042', customerName: 'Aditi Sharma', date: '2026-09-10', amount: 35757, paymentStatus: 'paid', orderType: 'retail', items: initialOrders[0].items, subtotal: 31998, discount: 2000, tax: 5759, rentalCharges: 0, securityDeposit: 0 },
  { id: 'INV-2041', orderId: 'RK-2026-1041', customerName: 'Riya Verma', date: '2026-09-10', amount: 18879, paymentStatus: 'paid', orderType: 'retail', items: initialOrders[1].items, subtotal: 15999, discount: 0, tax: 2880, rentalCharges: 0, securityDeposit: 0 },
  { id: 'INV-2040', orderId: 'RK-2026-1040', customerName: 'Sneha Kapoor', date: '2026-09-09', amount: 20476, paymentStatus: 'partial', orderType: 'mixed', items: initialOrders[2].items, subtotal: 10998, discount: 500, tax: 1979, rentalCharges: 3998, securityDeposit: 4000 },
  { id: 'INV-2039', orderId: 'RK-2026-1039', customerName: 'Meera Jain', date: '2026-09-09', amount: 11979, paymentStatus: 'paid', orderType: 'retail', items: initialOrders[3].items, subtotal: 10999, discount: 1000, tax: 1980, rentalCharges: 0, securityDeposit: 0 },
  { id: 'INV-2038', orderId: 'RK-2026-1038', customerName: 'Priya Gupta', date: '2026-09-08', amount: 14537, paymentStatus: 'paid', orderType: 'rental', items: initialOrders[4].items, subtotal: 2999, discount: 0, tax: 540, rentalCharges: 5998, securityDeposit: 6000 },
  { id: 'INV-2037', orderId: 'RK-2026-1037', customerName: 'Neha Singh', date: '2026-09-10', amount: 18059, paymentStatus: 'unpaid', orderType: 'retail', items: initialOrders[5].items, subtotal: 16999, discount: 2000, tax: 3060, rentalCharges: 0, securityDeposit: 0 },
];

export const rentalBookings: RentalBooking[] = [
  { id: 'RB-501', customerId: '1', customerName: 'Aditi Sharma', productId: '1', productName: 'Royal Bridal Lehenga', pickupDate: '2026-09-12', returnDate: '2026-09-14', rentalAmount: 4999, deposit: 10000, status: 'reserved' },
  { id: 'RB-502', customerId: '2', customerName: 'Riya Verma', productId: '2', productName: 'Designer Party Gown', pickupDate: '2026-09-10', returnDate: '2026-09-12', rentalAmount: 2999, deposit: 5000, status: 'active' },
  { id: 'RB-503', customerId: '3', customerName: 'Sneha Kapoor', productId: '9', productName: 'Reception Gown', pickupDate: '2026-09-09', returnDate: '2026-09-10', rentalAmount: 3499, deposit: 7000, status: 'due_today' },
  { id: 'RB-504', customerId: '7', customerName: 'Kavita Reddy', productId: '6', productName: 'Wedding Sherwani', pickupDate: '2026-09-07', returnDate: '2026-09-09', rentalAmount: 3999, deposit: 8000, status: 'overdue' },
  { id: 'RB-505', customerId: '4', customerName: 'Meera Jain', productId: '4', productName: 'Designer Silk Saree', pickupDate: '2026-09-11', returnDate: '2026-09-13', rentalAmount: 1999, deposit: 4000, status: 'reserved' },
  { id: 'RB-506', customerId: '5', customerName: 'Priya Gupta', productId: '7', productName: 'Indo-Western Fusion Set', pickupDate: '2026-09-08', returnDate: '2026-09-10', rentalAmount: 2499, deposit: 5000, status: 'active' },
  { id: 'RB-507', customerId: '6', customerName: 'Neha Singh', productId: '10', productName: 'Anarkali Suit', pickupDate: '2026-09-13', returnDate: '2026-09-15', rentalAmount: 1799, deposit: 3500, status: 'reserved' },
  { id: 'RB-508', customerId: '8', customerName: 'Pooja Desai', productId: '12', productName: 'Classic Black Tuxedo', pickupDate: '2026-09-10', returnDate: '2026-09-12', rentalAmount: 2999, deposit: 6000, status: 'active' },
  { id: 'RB-509', customerId: '1', customerName: 'Aditi Sharma', productId: '9', productName: 'Reception Gown', pickupDate: '2026-09-06', returnDate: '2026-09-08', rentalAmount: 3499, deposit: 7000, status: 'returned' },
  { id: 'RB-510', customerId: '9', customerName: 'Deepa Nair', productId: '1', productName: 'Royal Bridal Lehenga', pickupDate: '2026-09-15', returnDate: '2026-09-17', rentalAmount: 4999, deposit: 10000, status: 'reserved' },
  { id: 'RB-511', customerId: '10', customerName: 'Rohit Malhotra', productId: '7', productName: 'Indo-Western Fusion Set', pickupDate: '2026-09-11', returnDate: '2026-09-13', rentalAmount: 2499, deposit: 5000, status: 'reserved' },
];

export const customers: Customer[] = [
  { id: '1', name: 'Aditi Sharma', phone: '98XXX-XXX-10', email: 'aditi@email.com', type: 'both', retailOrders: 3, rentalOrders: 2, totalSpent: 52400, outstanding: 0, address: '12 MG Road, Raipur' },
  { id: '2', name: 'Riya Verma', phone: '98XXX-XXX-20', email: 'riya@email.com', type: 'both', retailOrders: 2, rentalOrders: 1, totalSpent: 34200, outstanding: 0, address: '45 Station Road, Raipur' },
  { id: '3', name: 'Sneha Kapoor', phone: '98XXX-XXX-30', email: 'sneha@email.com', type: 'both', retailOrders: 4, rentalOrders: 1, totalSpent: 67800, outstanding: 15000, address: '78 Tagore Nagar, Raipur' },
  { id: '4', name: 'Meera Jain', phone: '98XXX-XXX-40', email: 'meera@email.com', type: 'retail', retailOrders: 5, rentalOrders: 1, totalSpent: 45600, outstanding: 0, address: '23 Shanti Nagar, Raipur' },
  { id: '5', name: 'Priya Gupta', phone: '98XXX-XXX-50', email: 'priya@email.com', type: 'both', retailOrders: 3, rentalOrders: 1, totalSpent: 38900, outstanding: 3500, address: '56 Gandhi Marg, Raipur' },
  { id: '6', name: 'Neha Singh', phone: '98XXX-XXX-60', email: 'neha@email.com', type: 'rental', retailOrders: 1, rentalOrders: 2, totalSpent: 22100, outstanding: 0, address: '89 Nehru Nagar, Raipur' },
  { id: '7', name: 'Kavita Reddy', phone: '98XXX-XXX-70', email: 'kavita@email.com', type: 'rental', retailOrders: 0, rentalOrders: 3, totalSpent: 18700, outstanding: 8000, address: '34 VIP Colony, Raipur' },
  { id: '8', name: 'Pooja Desai', phone: '98XXX-XXX-80', email: 'pooja@email.com', type: 'both', retailOrders: 2, rentalOrders: 1, totalSpent: 29400, outstanding: 0, address: '67 Civil Lines, Raipur' },
  { id: '9', name: 'Deepa Nair', phone: '98XXX-XXX-90', email: 'deepa@email.com', type: 'retail', retailOrders: 6, rentalOrders: 1, totalSpent: 55300, outstanding: 0, address: '12 Lakshmi Nagar, Raipur' },
  { id: '10', name: 'Rohit Malhotra', phone: '98XXX-XXX-01', email: 'rohit@email.com', type: 'rental', retailOrders: 0, rentalOrders: 2, totalSpent: 12800, outstanding: 2500, address: '90 Dhamtari Road, Raipur' },
];

export const weeklySalesData = [
  { day: 'Mon', retail: 12400, rental: 8200 },
  { day: 'Tue', retail: 15800, rental: 6400 },
  { day: 'Wed', retail: 9200, rental: 11200 },
  { day: 'Thu', retail: 18600, rental: 7800 },
  { day: 'Fri', retail: 22100, rental: 12400 },
  { day: 'Sat', retail: 28900, rental: 15600 },
  { day: 'Sun', retail: 19500, rental: 10200 },
];

export const monthlySalesData = [
  { month: 'Jan', sales: 245000 },
  { month: 'Feb', sales: 289000 },
  { month: 'Mar', sales: 312000 },
  { month: 'Apr', sales: 198000 },
  { month: 'May', sales: 267000 },
  { month: 'Jun', sales: 334000 },
  { month: 'Jul', sales: 298000 },
  { month: 'Aug', sales: 356000 },
  { month: 'Sep', sales: 312000 },
];

export const topSellingProducts = [
  { name: 'Royal Bridal Lehenga', sold: 18 },
  { name: 'Designer Silk Saree', sold: 15 },
  { name: 'Kids Party Wear', sold: 14 },
  { name: 'Mauve Embroidered Suit', sold: 12 },
  { name: 'Anarkali Suit', sold: 10 },
];

export const mostRentedProducts = [
  { name: 'Royal Bridal Lehenga', rented: 24 },
  { name: 'Designer Party Gown', rented: 19 },
  { name: 'Wedding Sherwani', rented: 16 },
  { name: 'Reception Gown', rented: 14 },
  { name: 'Classic Black Tuxedo', rented: 11 },
];
