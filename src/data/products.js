// Mock product catalog for SamRo Store.
// In a real app this would come from a backend or public API.
const products = [
  { id: 'p01', name: 'Terra Ceramic Mug', price: 18, category: 'Kitchen', image: 'https://i.pinimg.com/736x/a1/42/cd/a142cd72898acde083706b63c19727b7.jpg', description: 'Hand-glazed stoneware mug with a matte terracotta finish. Holds 350ml.' },
  { id: 'p02', name: 'Woven Storage Basket', price: 34, category: 'Home', image: 'https://i.pinimg.com/1200x/7d/69/08/7d690887f7466ebfc453d8c5b5ef9828.jpg', description: 'Seagrass basket woven by hand, ideal for blankets, plants or laundry.' },
  { id: 'p03', name: 'Linen Table Runner', price: 22, category: 'Home', image: 'https://i.pinimg.com/736x/f9/35/81/f935810159d343bc3638cda6a1fe8840.jpg', description: 'Stonewashed European linen, 150cm, softens more with every wash.' },
  { id: 'p04', name: 'Cast Iron Skillet', price: 46, category: 'Kitchen', image: 'https://i.pinimg.com/736x/a9/05/9d/a9059d867c3aca724d1bbcb2e7308500.jpg', description: 'Pre-seasoned 10-inch skillet built to last generations.' },
  { id: 'p05', name: 'Merino Wool Scarf', price: 39, category: 'Apparel', image: 'https://i.pinimg.com/1200x/94/02/ec/9402ec5b7ad9f8096225ea36173fb912.jpg', description: 'Lightweight merino scarf, spun in small batches, six colourways.' },
  { id: 'p06', name: 'Canvas Tote Bag', price: 28, category: 'Apparel', image: 'https://i.pinimg.com/736x/65/a4/8a/65a48aa95b2b3a8b2911897eb6e6caa3.jpg', description: 'Heavyweight 16oz canvas, reinforced straps, fits a laptop and lunch.' },
  { id: 'p07', name: 'Oak Cutting Board', price: 32, category: 'Kitchen', image: 'https://i.pinimg.com/736x/96/d8/f0/96d8f03390a99e3afbd93bb7a2bd1b1a.jpg', description: 'End-grain white oak board, finished with food-safe mineral oil.' },
  { id: 'p08', name: 'Brass Reading Lamp', price: 68, category: 'Home', image: 'https://i.pinimg.com/1200x/87/56/11/875611ee4635f1fcd20ca3bd3f651173.jpg', description: 'Adjustable brass desk lamp with a warm dimmable LED bulb included.' },
  { id: 'p09', name: 'Ribbed Beanie', price: 16, category: 'Apparel', image: 'https://i.pinimg.com/1200x/07/2b/ea/072bea7992cd08c244cca810fb2cb34c.jpg', description: 'Chunky rib-knit beanie in brushed wool blend, one size.' },
  { id: 'p10', name: 'Enamel Pour-Over Kettle', price: 41, category: 'Kitchen', image: 'https://i.pinimg.com/1200x/40/b0/f8/40b0f887f6ae6794d5f793a34dbd08c6.jpg', description: 'Gooseneck kettle for slow, even pours over filter coffee.' },
  { id: 'p11', name: 'Wool Throw Blanket', price: 54, category: 'Home', image: 'https://i.pinimg.com/1200x/5c/b4/2f/5cb42f064eea53d007d95a18e3c7d538.jpg', description: 'Recycled wool throw, 130x170cm, woven in a small mill in Wales.' },
  { id: 'p12', name: 'Study Table', price: 24, category: 'Home', image: 'https://i.pinimg.com/736x/56/3f/19/563f192195fef283fa4d1862ab340ad3.jpg', description: 'Vegetable-tanned leather, ages beautifully, holds up to 6 cards.' },
]

export default products
