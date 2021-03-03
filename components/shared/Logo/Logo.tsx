import React from 'react';
import {Image} from 'react-native';

interface Props {
  width?: number;
  height?: number;
}
const Logo: React.FC<Props> = ({width = 200, height = 200}) => {
  return (
    <Image
      source={require('./img/bit-fitness-logo.png')}
      style={{width: width, height: height, resizeMode: 'contain'}}
    />
  );
};

export default Logo;
