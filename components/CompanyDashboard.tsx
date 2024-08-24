import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

// Company details section
const CompanyDetails = () => (
  <Card>
    <CardHeader>
      <CardTitle>Company Details</CardTitle>
      <CardDescription>Add your company information and logo here</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Upload your company logo and add relevant details.</p>
      <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <p className="text-sm text-gray-500">Drag and drop your logo here, or click to select a file</p>
      </div>
    </CardContent>
  </Card>
);

// Products section
const Products = () => (
  <Card>
    <CardHeader>
      <CardTitle>Products</CardTitle>
      <CardDescription>Manage your product catalog</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
          <div>
            <h4 className="font-semibold">Product 1</h4>
            <p className="text-sm text-gray-500">Short description of Product 1</p>
          </div>
        </li>
        <li className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
          <div>
            <h4 className="font-semibold">Product 2</h4>
            <p className="text-sm text-gray-500">Short description of Product 2</p>
          </div>
        </li>
      </ul>
    </CardContent>
  </Card>
);

// Promotions section
const Promotions = () => (
  <Card>
    <CardHeader>
      <CardTitle>Promotions</CardTitle>
      <CardDescription>Manage your promotional offers</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-blue-100 rounded-md">
          <span>January - March: 25% off</span>
          <span className="text-blue-600 font-semibold">Active</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
          <span>Summer Sale: 15% off</span>
          <span className="text-gray-600">Upcoming</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Channels section
const Channels = () => (
  <Card>
    <CardHeader>
      <CardTitle>Social Media Channels</CardTitle>
      <CardDescription>Manage your social media presence</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <span>Facebook</span>
        </li>
        <li className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
          <span>Instagram</span>
        </li>
        <li className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <span>Twitter</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);

// Scheduling section
const Scheduling = () => (
  <Card>
    <CardHeader>
      <CardTitle>Scheduling</CardTitle>
      <CardDescription>Manage your content calendar</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Upcoming Posts</h4>
        <Calendar className="text-gray-500" />
      </div>
      <ul className="space-y-2">
        <li className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
          <span>Product Launch Announcement</span>
          <span className="text-sm text-gray-500">Tomorrow, 10:00 AM</span>
        </li>
        <li className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
          <span>Weekly Special Promotion</span>
          <span className="text-sm text-gray-500">Friday, 2:00 PM</span>
        </li>
      </ul>
    </CardContent>
  </Card>
);

// Main component
const CompanyDashboard = () => {
  return (
    <div className=" bg-blue-100 shadow-sm rounded-md py-4 px-6 max-w-5xl w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="company-details">
          <AccordionTrigger>Company Details</AccordionTrigger>
          <AccordionContent><CompanyDetails /></AccordionContent>
        </AccordionItem>
        <AccordionItem value="products">
          <AccordionTrigger>Products</AccordionTrigger>
          <AccordionContent><Products /></AccordionContent>
        </AccordionItem>
        <AccordionItem value="promotions">
          <AccordionTrigger>Promotions</AccordionTrigger>
          <AccordionContent><Promotions /></AccordionContent>
        </AccordionItem>
        <AccordionItem value="channels">
          <AccordionTrigger>Channels</AccordionTrigger>
          <AccordionContent><Channels /></AccordionContent>
        </AccordionItem>
        <AccordionItem value="scheduling">
          <AccordionTrigger>Scheduling</AccordionTrigger>
          <AccordionContent><Scheduling /></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CompanyDashboard;