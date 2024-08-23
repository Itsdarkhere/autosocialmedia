'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface TrainingResult {
  data: {
    modelName: string;
    trainingStatus: string;
    trainingUrl: string;
  };
}

export default function ReplicateTrainingForm() {
  const [file, setFile] = useState<File | null>(null);
  const [steps, setSteps] = useState<string>('1000');
  const [hfToken, setHfToken] = useState<string>('');
  const [hfRepoId, setHfRepoId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TrainingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('steps', steps);
    if (hfToken) formData.append('hf_token', hfToken);
    if (hfRepoId) formData.append('hf_repo_id', hfRepoId);

    try {
      const response = await fetch('/api/train', {
        method: 'POST',
        body: formData,
      });

      const data: TrainingResult = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        throw new Error(data.data?.modelName || 'An error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">Replicate Training</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="file">Training Images (ZIP)</Label>
              <Input
                id="file"
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="steps">Steps</Label>
              <Input
                id="steps"
                type="number"
                value={steps}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSteps(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="hfToken">Hugging Face Token (optional)</Label>
              <Input
                id="hfToken"
                type="password"
                value={hfToken}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setHfToken(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="hfRepoId">Hugging Face Repo ID (optional)</Label>
              <Input
                id="hfRepoId"
                type="text"
                value={hfRepoId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setHfRepoId(e.target.value)}
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Training...
                </>
              ) : (
                'Start Training'
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {result && (
        <Alert>
          <AlertTitle>Training Initiated</AlertTitle>
          <AlertDescription>
            Model: {result.data.modelName}<br />
            Training Status: {result.data.trainingStatus}<br />
            <a href={result.data.trainingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Training Progress
            </a>
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
}