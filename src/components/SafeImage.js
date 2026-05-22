import React, { useState } from 'react';
import { Image } from 'react-native';

/**
 * SafeImage Component
 * Prevents app crashes when local assets are missing or remote URIs fail to resolve.
 * Hooks into onError to seamlessly swap in fallbackSource or the default SPM Logo.
 */
const SafeImage = ({ source, fallbackSource, style, resizeMode = 'cover', ...props }) => {
  const [hasError, setHasError] = useState(false);

  // Absolute fallback image: SPM Logo
  const defaultFallback = require('../../assets/images/spm_logo.png');

  const resolvedSource = hasError
    ? (fallbackSource || defaultFallback)
    : (source || defaultFallback);

  return (
    <Image
      {...props}
      source={resolvedSource}
      style={style}
      resizeMode={resizeMode}
      onError={() => {
        setHasError(true);
      }}
    />
  );
};

export default SafeImage;
