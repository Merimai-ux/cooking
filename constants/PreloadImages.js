// constants/PreloadImages.js
import { Image } from 'react-native';

const images = [
  require('../assets/logo.png'),
  require('../assets/recipe_day.png'),
  require('../assets/pp.png'),
  require('../assets/cake.png'),
  require('../assets/salad.png'),
  require('../assets/drink.png'),
  require('../assets/zakuski.png'),
  require('../assets/sousi.png'),
  require('../assets/dish.png'),
  require('../assets/pizza.png'),
  require('../assets/sushi.png'),
  require('../assets/ramen.png'),
  require('../assets/dolma.png'),
  require('../assets/risotto.png'),
];

export const preloadImages = async () => {
  try {
    const promises = images.map((image) => {
      const source = Image.resolveAssetSource(image).uri;
      return Image.prefetch(source);
    });

    await Promise.all(promises);
    console.log('✅ Все картинки успешно предзагружены!');
  } catch (error) {
    console.log('❌ Ошибка предзагрузки картинок:', error);
  }
};