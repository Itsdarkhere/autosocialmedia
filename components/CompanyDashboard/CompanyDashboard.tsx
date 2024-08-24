"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Scheduling from "./Scheduling";
import Channels from "./Channels";
import Promotions from "./Promotions";
import ProductsAndServices from "./ProductsAndServices";
import CompanyDetails from "./CompanyDetails";
import { Button } from "../ui/button";
import { Loader2 } from 'lucide-react';


export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface Promotion {
  id: string;
  description: string;
  isOngoing: boolean;
  startDate?: string;
  endDate?: string;
}

interface ApiResponse {
  imageUrl: string;
  message: string;
  post: string;
  success: boolean;
}

const GeneratedContent: React.FC<{ apiResponse: ApiResponse | null }> = ({ apiResponse }) => {
  if (!apiResponse) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={apiResponse.imageUrl} alt="Generated content" className="w-full h-auto" />
      <div className="p-4">
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{apiResponse.post}</p>
      </div>
    </div>
  );
};

// Main component
const CompanyDashboard = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [companyDescription, setCompanyDescription] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImagine = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/imagine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          companyDescription,
          services,
          promotions,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to imagine");
      }

      const data: ApiResponse = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Error in imagine request:", error);
      // Handle the error as needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex bg-blue-100 shadow-sm rounded-md py-4 px-6 max-w-7xl w-full mx-auto'>
      <div className='w-2/3 pr-6'>
        <h1 className='text-3xl font-bold mb-6'>Company Dashboard</h1>
        <Accordion type='single' collapsible className='space-y-4'>
          <AccordionItem value='company-details'>
            <AccordionTrigger>Company Details</AccordionTrigger>
            <AccordionContent>
              <CompanyDetails
                companyName={companyName}
                setCompanyName={setCompanyName}
                companyDescription={companyDescription}
                setCompanyDescription={setCompanyDescription}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='products'>
            <AccordionTrigger>Products and Services</AccordionTrigger>
            <AccordionContent>
              <ProductsAndServices
                services={services}
                setServices={setServices}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='promotions'>
            <AccordionTrigger>Promotions</AccordionTrigger>
            <AccordionContent>
              <Promotions promotions={promotions} setPromotions={setPromotions} />
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
        <Button
          onClick={handleImagine}
          className='mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Imagining...
            </>
          ) : (
            'Imagine'
          )}
        </Button>
      </div>
      <div className='w-1/3 pl-6'>
        <h2 className='text-2xl font-bold mb-4'>Generated Content</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <GeneratedContent apiResponse={apiResponse} />
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
