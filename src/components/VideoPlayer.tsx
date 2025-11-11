"use client";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  src?: string; // path to mp4/webm in /public or full URL
  poster?: string; // preview image path
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  youtubeId?: string; // if provided, embed YouTube (nocookie)
};

export function VideoPlayer({ className, src, poster, autoPlay, controls = true, muted, loop, youtubeId }: Props) {
  if (youtubeId) {
    return (
      <div className={cn("relative w-full overflow-hidden rounded-xl border border-brand-lavender/40 bg-black", className)}>
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`}
            title="Re.Align Intro Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Fallback to native HTML5 video
  return (
    <div className={cn("relative w-full overflow-hidden rounded-xl border border-brand-lavender/40 bg-black", className)}>
      <div className="aspect-video w-full">
        <video
          className="h-full w-full"
          src={src}
          poster={poster}
          controls={controls}
          muted={muted}
          autoPlay={autoPlay}
          loop={loop}
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

