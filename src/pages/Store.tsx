import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingCart, Search, Trash2, Minus, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

import cabbageImage from '@/assets/products/cabbage.jpg';
import onionsImage from '@/assets/products/onions.jpg';
import pigImage from '@/assets/products/pig.jpg';
import greenGramsImage from '@/assets/products/green-grams.jpg';
import sweetPotatoesImage from '@/assets/products/sweet-potatoes.jpg';
import maizeImage from '@/assets/products/maize.jpg';
import chickensImage from '@/assets/products/chickens.jpg';
import irishPotatoesImage from '@/assets/products/irish-potatoes.jpg';

interface Product {
  id: string; name: string; description: string; price: number; currency: string;
  category: string; imageUrl: string; inStock: boolean; unit: string;
}

const products: Product[] = [
  { id: '1', name: 'Fresh Cabbages', description: 'Organic farm-fresh cabbages.', price: 65, currency: 'KSH', category: 'vegetables', imageUrl: cabbageImage, inStock: true, unit: 'kg' },
  { id: '2', name: 'Red Onions', description: 'Premium red onions with rich flavor.', price: 100, currency: 'KSH', category: 'vegetables', imageUrl: onionsImage, inStock: true, unit: 'kg' },
  { id: '3', name: 'Farm Pigs', description: 'Healthy, well-bred pigs.', price: 15500, currency: 'KSH', category: 'livestock', imageUrl: pigImage, inStock: true, unit: 'pig' },
  { id: '4', name: 'Green Grams', description: 'High-quality green grams.', price: 220, currency: 'KSH', category: 'grains', imageUrl: greenGramsImage, inStock: true, unit: 'kg' },
  { id: '5', name: 'Sweet Potatoes', description: 'Fresh orange sweet potatoes.', price: 60, currency: 'KSH', category: 'vegetables', imageUrl: sweetPotatoesImage, inStock: true, unit: 'kg' },
  { id: '6', name: 'Maize (Corn)', description: 'Premium quality maize.', price: 48, currency: 'KSH', category: 'grains', imageUrl: maizeImage, inStock: true, unit: 'kg' },
  { id: '7', name: 'Free-Range Chickens', description: 'Healthy free-range chickens.', price: 900, currency: 'KSH', category: 'livestock', imageUrl: chickensImage, inStock: true, unit: 'chicken' },
  { id: '8', name: 'Irish Potatoes', description: 'Fresh Irish potatoes.', price: 75, currency: 'KSH', category: 'vegetables', imageUrl: irishPotatoesImage, inStock: true, unit: 'kg' },
];

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    const product = products.find(p => p.id === productId);
    toast({ title: "Added to cart", description: `${product?.name} added.` });
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(prev => {
      const newQty = (prev[productId] || 0) + delta;
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  const getCartTotal = () => Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    return total + (product?.price || 0) * quantity;
  }, 0);

  const getCartItemCount = () => Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    product: products.find(p => p.id === id)!,
    quantity: qty,
  })).filter(item => item.product);

  const handleCheckout = () => {
    toast({ title: 'Checkout', description: `Order of KSH ${getCartTotal().toLocaleString()} submitted. M-Pesa integration coming soon!` });
    setCart({});
    setCartOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Marketplace</h2>
        <Button variant="outline" size="sm" onClick={() => setCartOpen(true)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart ({getCartItemCount()})
          {getCartItemCount() > 0 && <Badge className="ml-2">{getCartTotal().toLocaleString()} KSH</Badge>}
        </Button>
      </div>

      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Shopping Cart</DialogTitle></DialogHeader>
          {cartItems.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">Your cart is empty.</p>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.currency} {product.price}/{product.unit}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateCartQty(product.id, -1)}><Minus className="h-3 w-3" /></Button>
                    <span className="text-sm w-6 text-center">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateCartQty(product.id, 1)}><Plus className="h-3 w-3" /></Button>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeFromCart(product.id)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              ))}
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>KSH {getCartTotal().toLocaleString()}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>Checkout with M-Pesa</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Filter" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="vegetables">Vegetables</SelectItem>
            <SelectItem value="grains">Grains</SelectItem>
            <SelectItem value="livestock">Livestock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="h-48 bg-muted/20 overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge variant="secondary" className="capitalize">{product.category}</Badge>
              </div>
              <CardDescription className="text-sm">{product.description}</CardDescription>
              <div className="flex items-center justify-between mt-4">
                <div className="text-2xl font-bold text-primary">{product.currency} {product.price.toLocaleString()}/{product.unit}</div>
                {product.inStock ? <Badge className="bg-success/10 text-success">In Stock</Badge> : <Badge variant="destructive">Out of Stock</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => addToCart(product.id)} disabled={!product.inStock}>
                {cart[product.id] ? `In Cart (${cart[product.id]})` : 'Add to Cart'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-muted-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Store;
