import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Upload, ImagePlus, Trash2, Plus, Eye, CheckCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  quantity: number;
  inStock: boolean;
  image: string | null;
}

export function ProductUpload() {
  const [products, setProducts] = useState<Product[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    unit: 'kg',
    description: '',
    quantity: '',
    image: null as string | null,
  });
  const { toast } = useToast();

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.quantity || !formData.description) {
      toast({ title: 'Missing fields', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      unit: formData.unit,
      description: formData.description,
      quantity: parseInt(formData.quantity),
      inStock: parseInt(formData.quantity) > 0,
      image: formData.image,
    };

    setProducts(prev => [...prev, newProduct]);
    toast({ title: 'Product added', description: `${formData.name} has been uploaded to the marketplace.` });

    setFormData({
      name: '',
      category: 'vegetables',
      price: '',
      unit: 'kg',
      description: '',
      quantity: '',
      image: null,
    });
    setDialogOpen(false);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({ title: 'Product removed', description: 'Product has been removed from your listings.' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
        toast({ title: 'Image uploaded', description: 'Your product image has been selected.' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleStock = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5" />Marketplace Products</CardTitle>
              <CardDescription>List and manage products available for sale.</CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload Product to Marketplace</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name *</label>
                    <Input
                      placeholder="e.g., Fresh Cabbages, Free-Range Chickens"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="grains">Grains</SelectItem>
                          <SelectItem value="livestock">Livestock</SelectItem>
                          <SelectItem value="dairy">Dairy</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Unit of Measurement *</label>
                      <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilogram (kg)</SelectItem>
                          <SelectItem value="piece">Piece</SelectItem>
                          <SelectItem value="bunch">Bunch</SelectItem>
                          <SelectItem value="crate">Crate</SelectItem>
                          <SelectItem value="liter">Liter (L)</SelectItem>
                          <SelectItem value="dozen">Dozen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price (KES) *</label>
                      <Input
                        type="number"
                        placeholder="e.g., 65"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Quantity Available *</label>
                      <Input
                        type="number"
                        placeholder="e.g., 100"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <Textarea
                      placeholder="Describe your product in detail (quality, origin, handling, etc.)"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Product Image</label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/30 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {formData.image ? (
                          <div className="space-y-2">
                            <img src={formData.image} alt="Preview" className="h-24 w-24 mx-auto rounded object-cover" />
                            <p className="text-sm text-muted-foreground">Click to change image</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground" />
                            <p className="text-sm font-medium">Upload product image</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, WebP up to 5MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddProduct}>Upload Product</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-30" />
              <h3 className="text-lg font-semibold mb-2">No products listed yet</h3>
              <p className="text-muted-foreground mb-4">Start by uploading your first product to the marketplace.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {products.map(product => (
                <div key={product.id} className="border rounded-lg p-4 flex items-start gap-4 hover:bg-muted/30 transition">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-20 w-20 rounded-lg object-cover" />
                  ) : (
                    <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.description.substring(0, 60)}...</p>
                      </div>
                      <Badge variant="secondary" className="capitalize">{product.category}</Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-semibold text-primary">KES {product.price.toLocaleString()}/{product.unit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Available</p>
                        <p className="font-semibold">{product.quantity} {product.unit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge className={product.inStock ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}>
                          {product.inStock ? 'In stock' : 'Out of stock'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStock(product.id)}
                          title={product.inStock ? 'Mark out of stock' : 'Mark in stock'}
                        >
                          <CheckCircle className={`h-4 w-4 ${product.inStock ? 'text-success' : 'text-muted-foreground'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveProduct(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {products.length > 0 && (
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-4 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-success mt-0.5" />
            <div>
              <p className="font-semibold text-success">You have {products.length} products listed</p>
              <p className="text-sm text-muted-foreground">Your products are now visible to buyers on the marketplace.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
