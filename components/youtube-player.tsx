"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit } from "lucide-react"

interface YouTubePlayerProps {
  videoId?: string
  title: string
  description: string
  thumbnailUrl?: string
}

export function YouTubePlayer({ videoId = "RJScvkUMt-8", title, description, thumbnailUrl }: YouTubePlayerProps) {
  const [currentVideoId, setCurrentVideoId] = useState(videoId)
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(videoId)

  const handleVideoIdChange = () => {
    const extractYouTubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[2].length === 11 ? match[2] : url
    }

    const newVideoId = extractYouTubeId(inputValue)
    setCurrentVideoId(newVideoId)
    setIsEditing(false)
  }

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden group w-full max-w-md mx-auto">
      <div className="aspect-video w-full relative">
        {isEditing ? (
          <div className="absolute inset-0 bg-black/80 z-10 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-4">
              <h3 className="text-lg font-medium text-center">Change YouTube Video</h3>
              <p className="text-sm text-gray-400 text-center">Enter a YouTube video URL or ID to display your work</p>
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="YouTube URL or video ID"
                  className="bg-gray-900 border-gray-700"
                />
                <Button onClick={handleVideoIdChange}>Save</Button>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="aspect-video w-full bg-black relative">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Change video</span>
            </Button>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}

export function FeaturedVideoSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Featured Work</h2>
        <p className="text-gray-400">Watch our showreel and featured 3D animations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        <YouTubePlayer
          title="3D Product Animation Showreel"
          description="A collection of our best 3D product animations and visualizations"
        />
        <YouTubePlayer
          videoId="QZUP9k45EXk"
          title="3D Animation Demo"
          description="Showcase of advanced 3D modeling and animation techniques"
        />
        <YouTubePlayer
          videoId="KBtI8m3zzKw"
          title="3D Product Visualization Techniques"
          description="Advanced lighting and rendering techniques for photorealistic product visualization"
        />
      </div>
    </div>
  )
}
