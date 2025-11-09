// import Image from "next/image";
import * as React from "react";

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
// <Image
// ref={ref as any}
// className={`aspect-square h-full w-full object-cover ${className}`}
// alt={alt || ""}
// width={width || ""}
// height={heigt || ""}
// {...props}
// /> 
  <img
    ref={ref}
    alt=""
    className={`aspect-square h-full w-full object-cover ${className}`}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({className, ...props },ref) =>(
        <div ref={ref} className={`flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium ${className}`}{...props} />
    ),
)
AvatarFallback.displayName = "AvatarFallback"

export {Avatar, AvatarImage, AvatarFallback}