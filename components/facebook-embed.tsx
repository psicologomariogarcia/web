"use client"

import { useEffect } from "react"

interface FacebookEmbedProps {
  /**
   * Facebook page URL or page ID
   * Example: "https://www.facebook.com/YourPageName" or "YourPageName"
   */
  href?: string
  /**
   * Width of the embed in pixels
   * @default 500
   */
  width?: number
  /**
   * Height of the embed in pixels
   * @default 500
   */
  height?: number
  /**
   * Show the small header
   * @default false
   */
  smallHeader?: boolean
  /**
   * Hide the cover photo
   * @default false
   */
  hideCover?: boolean
  /**
   * Show friend's faces
   * @default true
   */
  showFacepile?: boolean
  /**
   * Show page posts
   * @default true
   */
  showPosts?: boolean
  /**
   * Custom className for the container
   */
  className?: string
}

export function FacebookEmbed({
  href = "https://www.facebook.com/facebook",
  width = 500,
  height = 500,
  smallHeader = false,
  hideCover = false,
  showFacepile = true,
  showPosts = true,
  className = "",
}: FacebookEmbedProps) {
  useEffect(() => {
    // Load Facebook SDK script
    if (typeof window !== "undefined" && !window.FB) {
      const script = document.createElement("script")
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0"
      script.async = true
      script.defer = true
      script.crossOrigin = "anonymous"
      script.onload = () => {
        // Parse XFBML after script loads
        if (window.FB) {
          window.FB.XFBML.parse()
        }
      }
      document.body.appendChild(script)

      return () => {
        // Cleanup: remove script if component unmounts
        const existingScript = document.querySelector(
          'script[src*="connect.facebook.net"]'
        )
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript)
        }
      }
    } else if (window.FB) {
      // If SDK already loaded, parse immediately
      window.FB.XFBML.parse()
    }
  }, [])

  // Parse the href to get the page identifier
  const getPageId = (url: string) => {
    // If it's already just a page name/ID, return it
    if (!url.includes("facebook.com")) {
      return url
    }
    // Extract page name from URL
    const match = url.match(/facebook\.com\/([^/?]+)/)
    return match ? match[1] : url
  }

  const pageId = getPageId(href)

  return (
    <div className={`facebook-embed-container ${className}`}>
      <div
        className="fb-page"
        data-href={`https://www.facebook.com/${pageId}`}
        data-width={width}
        data-height={height}
        data-small-header={smallHeader}
        data-hide-cover={hideCover}
        data-show-facepile={showFacepile}
        data-show-posts={showPosts}
        data-tabs="timeline"
      />
    </div>
  )
}
