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
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "../ui/switch";

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

export default Promotions;
