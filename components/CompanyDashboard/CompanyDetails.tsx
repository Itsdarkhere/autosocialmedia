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

interface CompanyDetailsProps {
  companyName: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  companyDescription: string;
  setCompanyDescription: React.Dispatch<React.SetStateAction<string>>;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  companyName,
  setCompanyName,
  companyDescription,
  setCompanyDescription,
}) => {
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
          <Label htmlFor='company-name'>Company Name</Label>
          <Input
            id='company-name'
            placeholder='Enter your company name'
            className='mt-2'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='company-description'>Company Description</Label>
          <Textarea
            id='company-description'
            placeholder="Provide a descriptive tale of what your company does, your mission, vision, and the values you promote. Include information about your history, your unique selling points, and how you make a difference in your industry or community. This description should give a comprehensive overview of your company's identity and purpose."
            className='mt-2'
            rows={6}
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
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

export default CompanyDetails;
