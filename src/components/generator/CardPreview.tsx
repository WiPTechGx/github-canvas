import { CardConfig } from "@/pages/Generator";
import { GitHubStats } from "@/hooks/useGitHubStats";
import { DevQuote } from "@/hooks/useDevQuote";
import { useMemo, useState, useEffect } from "react";

interface CardPreviewProps {
  config: CardConfig;
  githubData?: GitHubStats | null;
  quote?: DevQuote | null;
}

export function CardPreview({ config, githubData, quote }: CardPreviewProps) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const selfHostedApiUrl = import.meta.env.VITE_API_URL; // Optional: set this for self-hosted deployments
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Determine API endpoint: prioritize VITE_API_URL if set, otherwise detect based on hostname
  const getApiEndpoint = () => {
    // If a custom API URL is set, use it
    if (selfHostedApiUrl) {
      return { baseUrl: selfHostedApiUrl, apiPath: '' };
    }
    
    // Check if running on Lovable preview or localhost (use Supabase functions)
    const hostname = window.location.hostname;
    const isLovableOrLocal = hostname.includes('lovable.app') || hostname.includes('localhost') || hostname.includes('127.0.0.1');
    
    if (isLovableOrLocal && supabaseUrl) {
      return { baseUrl: supabaseUrl, apiPath: '/functions/v1/generate-card' };
    }
    
    // Default: assume self-hosted (Vercel, Netlify, etc.) - use same origin
    return { baseUrl: window.location.origin, apiPath: '/api/card' };
  };
  
  const { baseUrl, apiPath } = getApiEndpoint();

  // Build the base params URL
  const paramsUrl = useMemo(() => {
    const params = new URLSearchParams({
      type: config.type,
      username: config.username || "",
      theme: config.theme,
      bg: config.bgColor,
      primary: config.primaryColor,
      secondary: config.secondaryColor,
      text: config.textColor,
      border: config.borderColor,
      radius: config.borderRadius.toString(),
      showBorder: config.showBorder.toString(),
      width: config.width.toString(),
      height: config.height.toString(),
      animation: config.animation || "fadeIn",
      speed: config.animationSpeed || "normal",
      gradient: config.gradientEnabled ? "true" : "false",
      gradientType: config.gradientType || "linear",
      gradientAngle: config.gradientAngle.toString(),
      gradientStart: config.gradientStart,
      gradientEnd: config.gradientEnd,
    });

    if (config.customText) {
      params.set("customText", config.customText);
    }

    // Add cache-busting for quotes
    if (config.type === "quote") {
      params.set("t", Date.now().toString());
    }

    return params.toString();
  }, [config, quote]);

  // Fetch base64 for img format, or use direct URL for svg format
  useEffect(() => {
    const fetchImage = async () => {
      if (config.previewFormat === "img") {
        setIsLoading(true);
        try {
          const response = await fetch(`${baseUrl}${apiPath}?${paramsUrl}&format=base64`);
          if (response.ok) {
            const dataUrl = await response.text();
            setImageSrc(dataUrl);
          } else {
            // Fallback to SVG URL if base64 fails
            setImageSrc(`${baseUrl}${apiPath}?${paramsUrl}`);
          }
        } catch {
          // Fallback to SVG URL on error
          setImageSrc(`${baseUrl}${apiPath}?${paramsUrl}`);
        } finally {
          setIsLoading(false);
        }
      } else {
        // SVG format - use direct URL
        setImageSrc(`${baseUrl}${apiPath}?${paramsUrl}`);
      }
    };

    fetchImage();
  }, [config.previewFormat, paramsUrl, baseUrl, apiPath]);

  // Check if we need a username
  const needsUsername = !config.username && config.type !== "quote" && config.type !== "custom";

  if (needsUsername) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-4xl">📊</span>
          <span className="text-sm text-center">Enter a GitHub username to preview</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      {isLoading ? (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-sm">Loading preview...</span>
        </div>
      ) : (
        <img 
          src={imageSrc}
          alt={`${config.type} card preview`}
          style={{ maxWidth: `${config.width}px` }}
          className="max-w-full h-auto rounded-lg"
        />
      )}
    </div>
  );
}
