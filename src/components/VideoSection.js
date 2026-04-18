"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function VideoSection({
  title,
  subtitle,
  videos,
  maxItems,
  className = "",
}) {
  const items = useMemo(() => {
    if (!Array.isArray(videos)) return [];
    if (typeof maxItems === "number") return videos.slice(0, maxItems);
    return videos;
  }, [videos, maxItems]);

  if (!items.length) return null;

  return (
    <section className={`py-14 sm:py-16 bg-white ${className}`.trim()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B0F19]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-4 text-gray-600 leading-relaxed">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-10 flex flex-col gap-10 max-w-6xl mx-auto">
          {items.map((video, index) => (
            <VideoCard key={`${video.title}-${video.url}-${index}`} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Global registry to manage only-one-video-playing behavior
const videoRegistry = new Set();

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const lastTapRef = useRef(0);

  // Target videos for enhanced functionality
  const targetVideos = ["/videos/clinicv1.mp4", "/videos/ayurvedavideo.mp4", "/videos/clinicv2.mp4"];
  const isTargetVideo = targetVideos.includes(video.url);

  // Handle mobile double-tap detection
  const handleTouchStart = (e) => {
    if (!isTargetVideo) return;
    
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapRef.current;
    
    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      e.preventDefault();
      const video = videoRef.current;
      if (video) {
        console.log('Mobile double-tap fullscreen for video:', video);
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      }
    }
    
    lastTapRef.current = currentTime;
  };

  // Handle single tap for play/pause
  const handleTouchEnd = (e) => {
    if (!isTargetVideo) return;
    
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapRef.current;
    
    if (tapLength > 300) {
      // Single tap detected
      setTimeout(() => {
        const video = videoRef.current;
        if (video) {
          if (video.paused) {
            video.play();
            // Pause all other videos
            document.querySelectorAll('video').forEach(v => {
              if (v !== video) v.pause();
            });
          } else {
            video.pause();
          }
        }
      }, 100);
    }
  };

  // Add play/pause on single click (desktop)
  const handleVideoClick = (e) => {
    console.log('Video clicked:', e.currentTarget);
    e.stopPropagation();
    const video = videoRef.current; // Use ref directly instead of querySelector
    if (video) {
      console.log('Video element found:', video);
      console.log('Video paused:', video.paused);
      if (video.paused) {
        console.log('Playing video');
        video.play();
        // Pause all other videos
        document.querySelectorAll('video').forEach(v => {
          if (v !== video) v.pause();
        });
      } else {
        console.log('Pausing video');
        video.pause();
      }
    } else {
      console.log('Video element not found');
    }
  };

  // Add fullscreen on double click (desktop)
  const handleVideoDoubleClick = (e) => {
    if (isTargetVideo) {
      e.preventDefault();
      const video = videoRef.current; // Use ref directly instead of querySelector
      if (video) {
        console.log('Requesting fullscreen for video:', video);
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        } else {
          console.log('Fullscreen not supported');
        }
      }
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      console.log('Fullscreen changed:', document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    const cardEl = cardRef.current;
    if (!videoEl || !cardEl) return;

    // Debug: Log when target video is loaded
    if (isTargetVideo) {
      console.log('Target video loaded:', video.url);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        setIsVisible(visible);

        if (visible) {
          // Pause all other videos
          videoRegistry.forEach((otherVideo) => {
            if (otherVideo !== videoEl && !otherVideo.paused) {
              otherVideo.pause();
            }
          });
          // Play this video (muted autoplay)
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay was prevented, ignore
            });
          }
        } else {
          videoEl.pause();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    observer.observe(cardEl);
    videoRegistry.add(videoEl);

    // Add play/pause on single click
    const handleVideoClick = (e) => {
      e.stopPropagation();
      const video = e.currentTarget.querySelector('video');
      if (video) {
        if (video.paused) {
          video.play();
          // Pause all other videos
          document.querySelectorAll('video').forEach(v => {
            if (v !== video) v.pause();
          });
        } else {
          video.pause();
        }
      }
    };

    // Add fullscreen on double click - ONLY for target videos
    const handleVideoDoubleClick = (e) => {
      if (isTargetVideo) {
        e.preventDefault();
        const video = e.currentTarget.querySelector('video');
        if (video) {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
          }
        }
      }
    };

    return () => {
      observer.disconnect();
      videoRegistry.delete(videoEl);
    };
  }, []);

  const isYouTube = video.type === "youtube";

  return (
    <div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden bg-[#0B0F19] shadow-lg border border-black/5 transition-all duration-700 ${
        isVisible ? "opacity-100 scale-100" : "opacity-80 scale-[0.98]"
      }`}
    >
      <div className="relative aspect-video w-full lg:h-[500px]">
        {isYouTube ? (
          <iframe
            className="w-full h-full"
            src={video.url}
            title={video.title}
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            src={video.url}
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover lg:h-[500px] ${isTargetVideo ? 'cursor-pointer' : ''}`}
            onClick={isTargetVideo ? handleVideoClick : undefined}
            onDoubleClick={isTargetVideo ? handleVideoDoubleClick : undefined}
            onTouchStart={isTargetVideo ? handleTouchStart : undefined}
            onTouchEnd={isTargetVideo ? handleTouchEnd : undefined}
            controls={false}
          />
        )}

        {/* Overlay gradient for better visual */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-white font-semibold leading-snug text-lg">
                {video.title}
              </p>
              {video.category ? (
                <p className="mt-1 text-white/70 text-sm capitalize">
                  {video.category}
                </p>
              ) : null}
            </div>

            {/* Play/Pause indicator for target videos only */}
            {isTargetVideo && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white/80 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-r-8 border-b-8 border-l-8 border-transparent border-r-white transform rotate-90 -ml-1"></div>
                </div>
                <span className="text-white/70 text-xs">Tap to play/pause</span>
                <div className="w-3 h-3 bg-white/80 rounded-full flex items-center justify-center ml-2">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                </div>
                <span className="text-white/70 text-xs">Double tap for fullscreen</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
