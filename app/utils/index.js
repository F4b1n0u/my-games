import Expo, {
  Image,
} from 'expo'

export const cacheImages = images => images.map(
  (image) => {
    let result

    if (typeof image === 'string') {
      result = Image.prefetch(image)
    } else {
      result = Expo.Asset.fromModule(image).downloadAsync()
    }

    return result
  }
)

export const cacheFonts = fonts => fonts.map(font => Expo.Font.loadAsync(font))
