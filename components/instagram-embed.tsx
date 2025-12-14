"use client"

import { useEffect, useState } from "react"

interface InstagramEmbedProps {
  /**
   * Instagram username (without @)
   * Example: "mariogarciapsic"
   */
  username: string
  /**
   * Number of posts to display
   * @default 6
   */
  postCount?: number
  /**
   * Width of the embed container
   * @default "100%"
   */
  width?: string | number
  /**
   * Custom className for the container
   */
  className?: string
}

export function InstagramEmbed({
  username,
  postCount = 6,
  width = "100%",
  className = "",
}: InstagramEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load Instagram embed script
    if (typeof window !== "undefined") {
      const script = document.createElement("script")
      script.src = "https://www.instagram.com/embed.js"
      script.async = true
      script.onload = () => {
        setIsLoading(false)
        // Trigger Instagram to process embeds
        if (window.instgrm) {
          window.instgrm.Embeds.process()
        }
      }
      script.onerror = () => {
        setError("Failed to load Instagram embed script")
        setIsLoading(false)
      }
      document.body.appendChild(script)

      return () => {
        const existingScript = document.querySelector(
          'script[src*="instagram.com/embed.js"]'
        )
        if (existingScript) {
          document.body.removeChild(existingScript)
        }
      }
    }
  }, [])

  // Instagram doesn't provide a direct way to embed a user's feed
  // This component provides a container that can be used with Instagram's oEmbed API
  // or with a third-party service. For now, we'll create a structure that can be
  // populated with Instagram posts via API or manual embeds.

  if (error) {
    return (
      <div className={`instagram-embed-error ${className}`}>
        <p className="text-muted-foreground">
          Unable to load Instagram content. Please check your connection.
        </p>
      </div>
    )
  }

  return (
    <div
      className={`instagram-embed-container ${className}`}
      style={{ width: typeof width === "number" ? `${width}px` : width }}
    >
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Loading Instagram content...</p>
        </div>
      )}
      <div className="instagram-feed">
        {/* 
          Note: Instagram requires individual post URLs to embed.
          To show a user's feed, you'll need to:
          1. Use Instagram Basic Display API to fetch posts
          2. Embed each post individually using Instagram's embed
          3. Or use a third-party service like SnapWidget, Juicer, etc.
          
          This component provides the structure. You can populate it by:
          - Fetching posts via API and rendering Instagram embeds
          - Using a service like: https://snapwidget.com/
        */}
        <div className="text-center p-8 border rounded-md bg-secondary/20">
          <p className="text-lg font-semibold mb-2">@{username}</p>
          <p className="text-sm text-muted-foreground mb-4">
            Instagram feed will be displayed here
          </p>
          <a
            href={`https://www.instagram.com/${username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View on Instagram →
          </a>
        </div>
      </div>
    </div>
  )
}

// Extended version that can embed individual Instagram posts
interface InstagramPostEmbedProps {
  /**
   * Instagram post URL
   * Example: "https://www.instagram.com/p/ABC123/"
   */
  url: string
  /**
   * Width of the embed
   * @default 500
   */
  width?: number
  /**
   * Custom className for the container
   */
  className?: string
}

export function InstagramPostEmbed({
  url,
  width = 500,
  className = "",
}: InstagramPostEmbedProps) {
  useEffect(() => {
    // Load Instagram embed script
    if (typeof window !== "undefined") {
      const script = document.createElement("script")
      script.src = "https://www.instagram.com/embed.js"
      script.async = true
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process()
        }
      }
      document.body.appendChild(script)

      return () => {
        const existingScript = document.querySelector(
          'script[src*="instagram.com/embed.js"]'
        )
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript)
        }
      }
    }
  }, [url])

  return (
    <div className={`instagram-post-embed ${className}`}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: `${width}px`,
          minWidth: "326px",
          padding: "0",
          width: "99.375%",
        }}
      >
        <div style={{ padding: "16px" }}>
          <a
            href={url}
            style={{
              background: "#FFFFFF",
              lineHeight: "0",
              padding: "0 0",
              textAlign: "center",
              textDecoration: "none",
              width: "100%",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            View this post on Instagram
          </a>
        </div>
      </blockquote>
    </div>
  )
}

// Type declaration for Instagram global
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
    FB?: {
      XFBML: {
        parse: () => void
      }
    }
  }
}
