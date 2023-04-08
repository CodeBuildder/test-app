import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera} from 'react-native-image-picker';
import {useSetRecoilState} from 'recoil';
import {ToastState} from '../atoms/ToastState';
import moment from 'moment';
import * as rnfs from 'react-native-fs';

const ImageCard = ({src, deleteImage}) => {
  return (
    <View style={styles.card}>
      <Image source={src} style={styles.img} />
      <Icon
        name="ios-close-circle"
        size={24}
        color={'#dddd'}
        style={styles.close}
        onPress={deleteImage}
      />
    </View>
  );
};

const ImageList = ({equipment, checklistType, images, setImages}) => {
  const setToast = useSetRecoilState(ToastState);
  const options = {mediaType: 'photo'};

  const saveImage = image => {
    const imagePath = `${rnfs.DocumentDirectoryPath}/${[
      equipment.id,
      checklistType,
      moment().format('YYYY-MM-DD'),
    ].join('-')}.jpg`;

    if (Platform.OS === 'ios') {
      rnfs.copyAssetsFileIOS(image.origURL, imagePath, 0, 0).catch(err => {
        setToast({
          visible: true,
          message: 'Image file write failed!!!',
          type: 'danger',
        });
      });
    } else if (Platform.OS === 'android') {
      rnfs.copyFile(image.uri, imagePath).catch(err => {
        setToast({
          visible: true,
          message: 'Image file write failed!!!',
          type: 'danger',
        });
      });
    }
  };

  const handleAddImage = () => {
    launchCamera(options).then(
      ({assets, didCancel, errorCode, errorMessage}) => {
        if (errorCode && errorMessage) {
          setToast({
            visible: true,
            message: errorMessage,
            type: 'danger',
          });
        } else if (!didCancel) {
          saveImage(assets[0]);
          setImages([...images, assets[0]]);
        }
      },
    );
  };

  const deleteImage = index => {
    let tmpImages = [...images];
    tmpImages.splice(index, 1);
    setImages(tmpImages);
  };

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <ImageCard
          key={index}
          src={image}
          deleteImage={() => deleteImage(index)}
        />
      ))}
      <TouchableOpacity
        style={[styles.card, styles.addCard]}
        onPress={() => handleAddImage()}>
        <View>
          <Icon name="ios-add-circle" size={32} color={'#666'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    backgroundColor: '#eee',
    margin: '1%',
    borderRadius: 8,
    minWidth: '31%',
    maxWidth: '31%',
    height: 160,
    overflow: 'hidden',
    position: 'relative',
  },
  addCard: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  close: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
  },
});

export default ImageList;
