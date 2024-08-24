"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

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

export default Channels;
