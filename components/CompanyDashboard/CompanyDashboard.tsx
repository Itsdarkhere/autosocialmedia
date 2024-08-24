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
