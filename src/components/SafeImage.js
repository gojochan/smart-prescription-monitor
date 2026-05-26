import React, { useState, useEffect } from 'react';
import { Image, Platform, ImageBackground } from 'react-native';

/**
 * SafeImage Component
 * Prevents app crashes when local assets are missing or remote URIs fail to resolve.
 * Hooks into onError to seamlessly swap in fallbackSource or the default SPM Logo.
 */
const SafeImage = ({ 
  source, 
  fallbackSource, 
  style, 
  resizeMode = 'cover',
  defaultSource,
  showLoadingIndicator = false,
  onError,
  onLoad,
  onLoadStart,
  retryCount = 1,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Reset error state when source changes
  useEffect(() => {
    setHasError(false);
    setRetryAttempt(0);
    setIsLoading(true);
  }, [source]);

  // Determine if source is a remote URI
  const getSourceType = () => {
    if (!source) return 'invalid';
    if (typeof source === 'number') return 'local';
    if (typeof source === 'object' && source.uri) {
      return source.uri.startsWith('http') ? 'remote' : 'local-asset';
    }
    return 'invalid';
  };

  const sourceType = getSourceType();
  const isRemoteUri = sourceType === 'remote';

  // Validate local asset by trying to require it
  const isValidLocalAsset = () => {
    if (sourceType === 'local') {
      try {
        // For local assets, we can't validate easily without attempting to load
        return true;
      } catch (error) {
        return false;
      }
    }
    return true;
  };

  // Get fallback image with error handling
  const getDefaultFallback = () => {
    try {
      // Try to require SPM logo
      return require('../../assets/images/spm_logo.png');
    } catch (error) {
      // If SPM logo doesn't exist, try to use a system default or return null
      console.warn('SPM Logo not found, using placeholder');
      // You can use a placeholder image URL or null
      return { uri: 'https://via.placeholder.com/400x400?text=No+Image' };
    }
  };

  const defaultFallback = getDefaultFallback();

  const handleError = (error) => {
    console.warn('Image failed to load:', sourceType, source);
    
    // Retry logic for remote images
    if (isRemoteUri && retryAttempt < retryCount) {
      setTimeout(() => {
        setRetryAttempt(retryAttempt + 1);
        setHasError(false);
      }, 1000 * (retryAttempt + 1)); // Exponential backoff
    } else {
      setHasError(true);
    }
    
    if (onError) onError(error);
  };

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    if (onLoadStart) onLoadStart();
  };

  // Determine the final source based on error state
  const getFinalSource = () => {
    if (hasError) {
      return fallbackSource || defaultFallback;
    }
    
    if (!source) {
      return defaultFallback;
    }
    
    // For remote URIs, add caching headers
    if (isRemoteUri && source.uri) {
      return {
        uri: source.uri,
        cache: 'force-cache',
        ...(Platform.OS === 'android' && { 
          headers: { 
            'Cache-Control': 'max-age=86400',
            'Accept': 'image/webp,image/*'
          } 
        })
      };
    }
    
    return source;
  };

  const finalSource = getFinalSource();

  // If no valid source, render nothing
  if (!finalSource) {
    return null;
  }

  // If showing loading indicator, you could wrap with a View
  if (showLoadingIndicator && isLoading && isRemoteUri && !hasError) {
    // You can implement a loading placeholder here
    // For simplicity, we just render the image
  }

  return (
    <Image
      {...props}
      source={finalSource}
      style={style}
      resizeMode={resizeMode}
      onError={handleError}
      onLoad={handleLoad}
      onLoadStart={handleLoadStart}
      defaultSource={defaultSource}
    />
  );
};

export default SafeImage;