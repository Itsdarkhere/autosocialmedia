"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  X,
  Plus,
  Trash2,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "./ui/switch";

interface Artifact {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const ArtifactModal: React.FC<{ onSave: (artifact: Artifact) => void }> = ({
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    if (title && description && images.length > 0) {
      onSave({
        id: Date.now().toString(),
        title,
        description,
        images,
      });
      setTitle("");
      setDescription("");
      setImages([]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> Add Artifact
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New Artifact</DialogTitle>
          <DialogDescription>
            Add details and upload images for a new company artifact.
          </DialogDescription>
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
            <Label className='text-right'>Images</Label>
            <div className='col-span-3'>
              <div className='grid grid-cols-3 gap-2'>
                {images.map((image, index) => (
                  <div key={index} className='relative'>
                    <img
                      src={image}
                      alt={`Artifact ${index + 1}`}
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
          <Button onClick={handleSave}>Save Artifact</Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

const CompanyDetails: React.FC = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  const addArtifact = (newArtifact: Artifact) => {
    setArtifacts((prev) => [...prev, newArtifact]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details</CardTitle>
        <CardDescription>
          Add your company information and artifacts
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div>
          <Label htmlFor='company-description'>Company Description</Label>
          <Textarea
            id='company-description'
            placeholder="Provide a descriptive tale of what your company does, your mission, vision, and the values you promote. Include information about your history, your unique selling points, and how you make a difference in your industry or community. This description should give a comprehensive overview of your company's identity and purpose."
            className='mt-2'
            rows={6}
          />
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Company Artifacts</h3>
          <div className='space-y-4'>
            {artifacts.map((artifact) => (
              <Card key={artifact.id}>
                <CardHeader>
                  <CardTitle>{artifact.title}</CardTitle>
                  <CardDescription>{artifact.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-5 gap-2'>
                    {artifact.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${artifact.title} ${index + 1}`}
                        className='w-full h-20 object-cover rounded-md'
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ArtifactModal onSave={addArtifact} />
        </div>
      </CardContent>
    </Card>
  );
};

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
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

const ProductsAndServices: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);

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

interface Promotion {
  id: string;
  description: string;
  isOngoing: boolean;
  startDate?: string;
  endDate?: string;
}

const PromotionModal: React.FC<{ onSave: (promotion: Promotion) => void }> = ({
  onSave,
}) => {
  const [description, setDescription] = useState("");
  const [isOngoing, setIsOngoing] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSave = () => {
    if (description) {
      onSave({
        id: Date.now().toString(),
        description,
        isOngoing,
        startDate: isOngoing ? undefined : startDate,
        endDate: isOngoing ? undefined : endDate,
      });
      setDescription("");
      setIsOngoing(false);
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> Add Promotion
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New Promotion</DialogTitle>
          <DialogDescription>Create a new promotional offer.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='col-span-3'
              placeholder="e.g., 'Buy one get one free' or '50% off Product X'"
            />
          </div>
          <div className='flex items-center space-x-2'>
            <Switch
              id='ongoing-switch'
              checked={isOngoing}
              onCheckedChange={setIsOngoing}
            />
            <Label htmlFor='ongoing-switch'>Ongoing promotion</Label>
          </div>
          {!isOngoing && (
            <>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='start-date' className='text-right'>
                  Start Date
                </Label>
                <Input
                  id='start-date'
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='end-date' className='text-right'>
                  End Date
                </Label>
                <Input
                  id='end-date'
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className='col-span-3'
                />
              </div>
            </>
          )}
        </div>
        <DialogTrigger asChild>
          <Button onClick={handleSave}>Save Promotion</Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

const Promotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const addPromotion = (newPromotion: Promotion) => {
    setPromotions((prev) => [...prev, newPromotion]);
  };

  const removePromotion = (id: string) => {
    setPromotions((prev) => prev.filter((promo) => promo.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promotions</CardTitle>
        <CardDescription>Manage your promotional offers</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {promotions.map((promotion) => (
          <div
            key={promotion.id}
            className='flex items-center justify-between p-2 bg-gray-100 rounded-md'
          >
            <div>
              <p className='font-semibold'>{promotion.description}</p>
              {promotion.isOngoing ? (
                <span className='text-sm text-green-600'>Ongoing</span>
              ) : (
                <span className='text-sm text-blue-600'>
                  {promotion.startDate} - {promotion.endDate}
                </span>
              )}
            </div>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => removePromotion(promotion.id)}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        ))}
        <PromotionModal onSave={addPromotion} />
      </CardContent>
    </Card>
  );
};

interface SocialChannel {
  name: string;
  icon: React.ReactNode;
  color: string;
  isConnected: boolean;
}

const Channels: React.FC = () => {
  const [channels, setChannels] = useState<SocialChannel[]>([
    {
      name: "Facebook",
      icon: <Facebook />,
      color: "bg-blue-500",
      isConnected: false,
    },
    {
      name: "Instagram",
      icon: <Instagram />,
      color: "bg-pink-500",
      isConnected: false,
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      color: "bg-blue-400",
      isConnected: false,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      color: "bg-blue-700",
      isConnected: false,
    },
  ]);

  const handleConnect = (channelName: string) => {
    if (channelName === "Instagram") {
      // Placeholder for future Instagram connection flow
      console.log("Connecting to Instagram...");
      // You can add your Instagram connection logic here in the future
    } else {
      setChannels(
        channels.map((channel) =>
          channel.name === channelName
            ? { ...channel, isConnected: !channel.isConnected }
            : channel
        )
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Channels</CardTitle>
        <CardDescription>Manage your social media presence</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='space-y-4'>
          {channels.map((channel) => (
            <li
              key={channel.name}
              className='flex items-center justify-between'
            >
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-10 h-10 ${channel.color} rounded-full flex items-center justify-center text-white`}
                >
                  {channel.icon}
                </div>
                <span className='font-medium'>{channel.name}</span>
              </div>
              <Button
                variant={channel.isConnected ? "outline" : "default"}
                onClick={() => handleConnect(channel.name)}
              >
                {channel.name === "Instagram"
                  ? "Connect"
                  : channel.isConnected
                  ? "Disconnect"
                  : "Connect"}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Scheduling: React.FC = () => {
  const [publishTime, setPublishTime] = useState("17:00");
  const [requireReview, setRequireReview] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduling</CardTitle>
        <CardDescription>
          Set your daily content publishing time
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <Clock className='text-gray-500' />
          <div className='flex-grow'>
            <Label htmlFor='publish-time'>Daily Publishing Time</Label>
            <Input
              id='publish-time'
              type='time'
              value={publishTime}
              onChange={(e) => setPublishTime(e.target.value)}
            />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='review-checkbox'
              checked={requireReview}
              onCheckedChange={(checked) =>
                setRequireReview(checked as boolean)
              }
            />
            <Label htmlFor='review-checkbox'>
              Wait for review before posting
            </Label>
          </div>
          <p className='text-sm max-w-xl text-gray-500 ml-6'>
            If this box is checked, we won't post the content automatically.
            You'll need to first approve each piece of content in the
            EasySocialMedia mobile app or website.
          </p>
        </div>
        <Button>Save Settings</Button>
      </CardContent>
    </Card>
  );
};

// Main component
const CompanyDashboard = () => {
  return (
    <div className=' bg-blue-100 shadow-sm rounded-md py-4 px-6 max-w-5xl w-full mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Company Dashboard</h1>
      <Accordion type='single' collapsible className='space-y-4'>
        <AccordionItem value='company-details'>
          <AccordionTrigger>Company Details</AccordionTrigger>
          <AccordionContent>
            <CompanyDetails />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='products'>
          <AccordionTrigger>Products and Services</AccordionTrigger>
          <AccordionContent>
            <ProductsAndServices />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='promotions'>
          <AccordionTrigger>Promotions</AccordionTrigger>
          <AccordionContent>
            <Promotions />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='channels'>
          <AccordionTrigger>Channels</AccordionTrigger>
          <AccordionContent>
            <Channels />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='scheduling'>
          <AccordionTrigger>Scheduling</AccordionTrigger>
          <AccordionContent>
            <Scheduling />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CompanyDashboard;
