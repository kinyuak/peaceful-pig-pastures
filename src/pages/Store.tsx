import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  ShoppingCart,
  Search,
  Trash2,
  Minus,
  Plus,
  Upload,
  LogIn,
  Star,
  Heart,
  ShieldCheck,
  Truck,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

import cabbageImage from '@/assets/products/cabbage.jpg';
import onionsImage from '@/assets/products/onions.jpg';
import pigImage from '@/assets/products/pig.jpg';
import greenGramsImage from '@/assets/products/green-grams.jpg';
import sweetPotatoesImage from '@/assets/products/sweet-potatoes.jpg';
import maizeImage from '@/assets/products/maize.jpg';
import chickensImage from '@/assets/products/chickens.jpg';
import irishPotatoesImage from '@/assets/products/irish-potatoes.jpg';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
  unit: string;
  rating: number;
  reviews: number;
  farmName: string;
  location: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Cabbages',
    description: 'Organic farm-fresh cabbages for healthy soups and salads.',
    price: 65,
    currency: 'KSH',
    category: 'vegetables',
    imageUrl: cabbageImage,
    inStock: true,
    unit: 'kg',
    rating: 4.8,
    reviews: 204,
    farmName: 'Green Valley Farms',
    location: 'Kiambu',
  },
  {
    id: '2',
    name: 'Red Onions',
    description: 'Premium red onions with rich flavor and perfect crunch.',
    price: 100,
    currency: 'KSH',
    category: 'vegetables',
    imageUrl: onionsImage,
    inStock: true,
    unit: 'kg',
    rating: 4.7,
    reviews: 138,
    farmName: 'Mwea Harvest Co.',
    location: 'Embu',
  },
  {
    id: '3',
    name: 'Farm Pigs',
    description: 'Healthy, well-bred pigs for livestock and breeding programs.',
    price: 15500,
    currency: 'KSH',
    category: 'livestock',
    imageUrl: pigImage,
    inStock: true,
    unit: 'pig',
    rating: 4.9,
    reviews: 56,
    farmName: 'Savannah Livestock',
    location: 'Nakuru',
  },
  {
    id: '4',
    name: 'Green Grams',
    description: 'High-quality green grams, rich in protein and flavor.',
    price: 220,
    currency: 'KSH',
    category: 'grains',
    imageUrl: greenGramsImage,
    inStock: true,
    unit: 'kg',
    rating: 4.6,
    reviews: 112,
    farmName: 'Amani Grain Mill',
    location: 'Kitui',
  },
  {
    id: '5',
    name: 'Sweet Potatoes',
    description: 'Fresh orange sweet potatoes packed with natural sweetness.',
    price: 60,
    currency: 'KSH',
    category: 'vegetables',
    imageUrl: sweetPotatoesImage,
    inStock: true,
    unit: 'kg',
    rating: 4.8,
    reviews: 182,
    farmName: 'Riverbend Produce',
    location: 'Kisii',
  },
  {
    id: '6',
    name: 'Maize (Corn)',
    description: 'Premium quality maize for porridge, flour, and feed.',
    price: 48,
    currency: 'KSH',
    category: 'grains',
    imageUrl: maizeImage,
    inStock: true,
    unit: 'kg',
    rating: 4.7,
    reviews: 240,
    farmName: 'Golden Acres',
    location: 'Naivasha',
  },
  {
    id: '7',
    name: 'Free-Range Chickens',
    description: 'Healthy free-range chickens raised for quality and taste.',
    price: 900,
    currency: 'KSH',
    category: 'livestock',
    imageUrl: chickensImage,
    inStock: true,
    unit: 'chicken',
    rating: 4.9,
    reviews: 77,
    farmName: 'Hilltop Poultry',
    location: 'Nyeri',
  },
  {
    id: '8',
    name: 'Irish Potatoes',
    description: 'Fresh Irish potatoes for home cooking and family meals.',
    price: 75,
    currency: 'KSH',
    category: 'vegetables',
    imageUrl: irishPotatoesImage,
    inStock: true,
    unit: 'kg',
    rating: 4.7,
    reviews: 166,
    farmName: 'Highland Growers',
    location: 'Molo',
  },
];

const categoryMeta = [
  { label: 'All products', value: 'all', count: products.length },
  { label: 'Vegetables', value: 'vegetables', count: products.filter((p) => p.category === 'vegetables').length },
  { label: 'Grains', value: 'grains', count: products.filter((p) => p.category === 'grains').length },
  { label: 'Livestock', value: 'livestock', count: products.filter((p) => p.category === 'livestock').length },
];

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch = !normalized || product.name.toLowerCase().includes(normalized) || product.description.toLowerCase().includes(normalized);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = [...result].sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  const addToCart = (productId: string) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    const product = products.find((p) => p.id === productId);
    toast({ title: 'Added to cart', description: `${product?.name} added.` });
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) => {
      const newQty = (prev[productId] || 0) + delta;
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  const getCartTotal = () => Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find((p) => p.id === productId);
    return total + (product?.price || 0) * quantity;
  }, 0);

  const getCartItemCount = () => Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({
      product: products.find((p) => p.id === id)!,
      quantity: qty,
    }))
    .filter((item) => item.product);

  const handleCheckout = () => {
    if (!user) {
      toast({ title: 'Sign In Required', description: 'Please sign in to complete your order.' });
      return;
    }

    toast({ title: 'Checkout', description: `Order of KSH ${getCartTotal().toLocaleString()} submitted. M-Pesa integration coming soon!` });
    setCart({});
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AgriHerd</p>
              <h1 className="text-lg font-bold">Marketplace</h1>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 rounded-full border bg-muted/30 px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search fruits, livestock, grains..."
              className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0 shadow-none"
            />
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <Button variant="outline" asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Sell
                </Link>
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {getCartItemCount() > 0 && (
                <Badge className="ml-2 rounded-full px-1.5 py-0.5 min-w-[22px] h-5">{getCartItemCount()}</Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-background to-emerald-500/10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 p-6 md:p-8">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 self-start rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified local sellers
              </div>

              <h2 className="mt-5 text-4xl md:text-5xl font-black leading-tight tracking-tight">
                Fresh from local farms,
                <span className="text-primary block">delivered with trust.</span>
              </h2>

              <p className="mt-4 max-w-xl text-base text-muted-foreground">
                Discover quality vegetables, grains, and livestock from trusted producers near you.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link to="#products" className="flex items-center gap-2">
                    Shop now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                {!user && (
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign in as seller
                    </Link>
                  </Button>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 border">
                  <Truck className="h-4 w-4 text-primary" />
                  Fast delivery
                </div>
                <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 border">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Secure payments
                </div>
                <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 border">
                  <Star className="h-4 w-4 text-primary" />
                  4.8 average rating
                </div>
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Best sellers this week</p>
                  <h3 className="text-xl font-bold">Seasonal favourites</h3>
                </div>
                <Badge className="bg-primary/10 text-primary">Fresh</Badge>
              </div>

              <div className="space-y-4">
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 rounded-2xl border p-3 hover:bg-muted/30 transition-colors">
                    <img src={product.imageUrl} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.farmName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{product.currency} {product.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">/{product.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]" id="products">
          <aside className="rounded-3xl border bg-card p-5 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">Filters</h3>
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">Categories</p>
                <div className="space-y-2">
                  {categoryMeta.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors ${
                        selectedCategory === category.value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-muted bg-transparent text-foreground hover:bg-muted/30'
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">Quick filters</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-xl border p-3">
                    <span>Verified sellers</span>
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border p-3">
                    <span>Free delivery</span>
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border p-3">
                    <span>Top rated</span>
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-3xl border bg-card p-4">
              <div>
                <h3 className="text-2xl font-bold">Fresh picks for you</h3>
                <p className="text-sm text-muted-foreground">{filteredProducts.length} products available today</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="md:hidden relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products"
                    className="pl-10"
                  />
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="rating">Top rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to high</SelectItem>
                    <SelectItem value="price-high">Price: High to low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl border border-dashed bg-card p-12 text-center">
                <p className="text-xl font-semibold">No products match your filters.</p>
                <p className="text-muted-foreground mt-2">Try different keywords or select another category.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-card">
                    <div className="relative">
                      <img src={product.imageUrl} alt={product.name} className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <button
                        type="button"
                        className="absolute right-3 top-3 rounded-full bg-background/80 p-2 shadow-sm backdrop-blur-sm"
                        aria-label={`Save ${product.name}`}
                      >
                        <Heart className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <Badge className="absolute left-3 top-3 capitalize">{product.category}</Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-lg leading-snug">{product.name}</CardTitle>
                          <p className="mt-1 text-xs text-muted-foreground">{product.farmName}</p>
                        </div>
                        {product.inStock ? (
                          <Badge className="bg-emerald-500/10 text-emerald-600">In stock</Badge>
                        ) : (
                          <Badge variant="destructive">Sold out</Badge>
                        )}
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="font-medium text-foreground">{product.rating}</span>
                        </div>
                        <span>({product.reviews})</span>
                        <span>•</span>
                        <span>{product.location}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <CardDescription className="text-sm leading-6 min-h-[52px]">{product.description}</CardDescription>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {product.currency} {product.price.toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">per {product.unit}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">Free delivery</Badge>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button className="flex-1" onClick={() => addToCart(product.id)} disabled={!product.inStock}>
                          {cart[product.id] ? `Add another (${cart[product.id]})` : 'Add to cart'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Shopping cart</DialogTitle>
          </DialogHeader>

          {cartItems.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <ShoppingCart className="mx-auto h-10 w-10 mb-3 opacity-50" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 rounded-2xl border p-3">
                  <img src={product.imageUrl} alt={product.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.currency} {product.price}/{product.unit}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateCartQty(product.id, -1)}><Minus className="h-3 w-3" /></Button>
                    <span className="w-5 text-center text-sm">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateCartQty(product.id, 1)}><Plus className="h-3 w-3" /></Button>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeFromCart(product.id)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span>KSH {getCartTotal().toLocaleString()}</span>
              </div>

              {!user ? (
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/login" className="flex items-center justify-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign in to checkout
                  </Link>
                </Button>
              ) : (
                <Button className="w-full" onClick={handleCheckout}>Checkout with M-Pesa</Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Store;
