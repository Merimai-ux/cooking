// utils/Device.js
import { useWindowDimensions } from 'react-native';

export const useDeviceType = () => {
  const { width, height } = useWindowDimensions();
  
  // В Android планшеты обычно имеют ширину от 600dp
  const isTablet = width >= 600;
  // Маленькие телефоны (например, старые модели)
  const isSmallPhone = width < 360;
  
  return { isTablet, isSmallPhone, width, height };
};