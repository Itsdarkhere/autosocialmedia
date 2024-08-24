"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Upload, X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Service } from "./CompanyDashboard";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const ProductModal: React.FC<{ onSave: (product: Product) => void }> = ({
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages].slice(0, 25));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (title && description && price) {
      onSave({
        id: Date.now().toString(),
        title,
        description,
        price: parseFloat(price),
        images,
      });
      setTitle("");
      setDescription("");
      setPrice("");
      setImages([]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Add details for a new product.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='title' className='text-right'>
              Title
            </Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='price' className='text-right'>
              Price
            </Label>
            <Input
              id='price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right'>Images</Label>
            <div className='col-span-3'>
              <div className='grid grid-cols-3 gap-2'>
                {images.map((image, index) => (
                  <div key={index} className='relative'>
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className='w-full h-20 object-cover rounded-md'
                    />
                    <Button
                      variant='destructive'
                      size='icon'
                      className='absolute top-0 right-0 h-5 w-5'
                      onClick={() => removeImage(index)}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </div>
                ))}
                {images.length < 25 && (
                  <label className='flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400'>
                    <input
                      type='file'
                      multiple
                      accept='image/*'
                      className='hidden'
                      onChange={handleImageUpload}
                    />
                    <Upload className='h-6 w-6 text-gray-400' />
                  </label>
                )}
              </div>
              <p className='text-sm text-gray-500 mt-2'>
                {images.length}/25 images uploaded
              </p>
            </div>
          </div>
        </div>
        <DialogTrigger asChild>
          <Button onClick={handleSave}>Save Product</Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

const ServiceModal: React.FC<{ onSave: (service: Service) => void }> = ({
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = () => {
    if (title && description && price) {
      onSave({
        id: Date.now().toString(),
        title,
        description,
        price: parseFloat(price),
      });
      setTitle("");
      setDescription("");
      setPrice("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> Add Service
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>Add details for a new service.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='title' className='text-right'>
              Title
            </Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='price' className='text-right'>
              Price
            </Label>
            <Input
              id='price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogTrigger asChild>
          <Button onClick={handleSave}>Save Service</Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

interface ProductsAndServicesProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const ProductsAndServices: React.FC<ProductsAndServicesProps> = ({
  services,
  setServices,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const addService = (newService: Service) => {
    setServices((prev) => [...prev, newService]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products and Services</CardTitle>
        <CardDescription>
          Manage your product and service catalog
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Products</h3>
          <div className='space-y-4'>
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='font-semibold'>
                    Price: ${product.price.toFixed(2)}
                  </p>
                  {product.images.length > 0 && (
                    <div className='grid grid-cols-5 gap-2 mt-2'>
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className='w-full h-20 object-cover rounded-md'
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <ProductModal onSave={addProduct} />
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Services</h3>
          <div className='space-y-4'>
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='font-semibold'>
                    Price: ${service.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <ServiceModal onSave={addService} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsAndServices;
