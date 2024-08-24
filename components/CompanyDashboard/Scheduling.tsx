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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";

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
            If this box is checked, we won&apos;'t post the content automatically.
            You&apos;'ll need to first approve each piece of content in the
            EasySocialMedia mobile app or website.
          </p>
        </div>
        <Button>Save Settings</Button>
      </CardContent>
    </Card>
  );
};

export default Scheduling;
