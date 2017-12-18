import React from 'react';
import {
  AppRegistry,
  Animated,
  asset,
  Model,
  Pano,
  Text,
  AmbientLight,
  View
} from 'react-vr';
import { Easing } from 'react-native';

class starwars extends React.Component {
  constructor() {
    super();

    this.state = {
      earthSpin: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.spinAnimation();
  }

  spinAnimation() {
    this.state.earthSpin.setValue(0.7);
    Animated.timing(
      this.state.earthSpin,
      {
       toValue: 1,
       duration: 100000,
       easing: Easing.linear
      }
    ).start( () => this.spinAnimation() );
  }

  render() {
    const earthSpin = this.state.earthSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    const AnimatedModel = Animated.createAnimatedComponent(Model);

    return (
      <View>
        <AmbientLight intensity={ 2.7 }  />
        <Pano source={{
            uri: [
              '../static_assets/space/space_right.png',
              '../static_assets/space/space_left.png',
              '../static_assets/space/space_up.png',
              '../static_assets/space/space_down.png',
              '../static_assets/space/space_front.png',
              '../static_assets/space/space_back.png'
            ]
        }} />
        <AnimatedModel
          style={{
            transform: [
              {translate: [0, 0, -150]},
              {scale: 0.0003 },
              {rotateX: 20 },
              {rotateZ: 30},
              {rotateY: earthSpin },
            ],
          }}
          source={{obj:asset('deathstar_taylor/3d-model.obj'), mtl:asset('deathstar_taylor/3d-model.mtl')}}
          lit={false}
          />
      </View>
    );
  }
}

AppRegistry.registerComponent('starwars', () => starwars);
