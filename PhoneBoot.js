/**
 * Created by alan on 16/11/2.
 */
'use strict'
import React, { Component } from 'react'
import { BackHandler, Image, StatusBar, View } from 'react-native'

import { Navigator } from 'react-native-deprecated-custom-components'
import DeviceInfo from 'react-native-device-info-hfjy'
// import RobotPen from 'react-native-robot-pen-hfjy'
import  {Dialog}  from './app/componet'
// import GuidePage from './app/phone/pages/guide/GuidePage'
import Main from './app/phone/pages/Main'
import { Strings } from './app/res'
// import AdvertisementIndex from './app/phone/pages/advertisementPage/AdvertisementIndex'


export default class PhoneBoot extends Component {


  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid)
  }

  _onBackAndroid = () => {
    let nav = this.refs.navigator
    if (nav) {
      let routers = nav.getCurrentRoutes()
      if (routers.length > 1) {
        nav.pop()
        return true
      } else {
        Dialog.show({
          leftVisible: true,
          title: Strings.exit,
          rightPress: () => {
            BackHandler.exitApp()
          },
        })
        return true
      }
    }
  }

  render () {
    // if (this.state.loaded) {
      return (
        <View style={{flex: 1}}>
          <StatusBar hidden={false}/>
          {this.renderNav()}
        </View>
      )
    // } else {
    //   return (
    //     <Image
    //       style={{width: '100%', height: '100%'}}
    //       resizeMode={'cover'}
    //       source={require('./app/phone/images/image_start.png')}/>
    //   )
    // }
  }

  renderNav = () => {
    // const componentName = 'AdvertisementIndex'
    // const component = AdvertisementIndex

    return (
      <Navigator
        ref='navigator'
        initialRoute={{
          component: Main,
          name: 'Main',
        }}
        configureScene={(route) => {
          const configure = Navigator.SceneConfigs.PushFromRight
          return {
            ...configure,
            gestures: this._ungesturesPop(route, configure),
          }
        }}
        renderScene={(route, navigator) => {
          const Component = route.component
          const name = route.name

          let isIphoneX = DeviceInfo.getModel() === 'iPhone X'
          let paddingB = {paddingBottom: isIphoneX ? 25 : 0}

          return (
            <View style={[{width: '100%', height: '100%'}, paddingB]}>
              <Component navigator={navigator}/>
            </View>
          )
        }}/>
    )
  }

  _ungesturesPop = (route, configure) => {
    switch (route.name) {
      case 'LessonClassroom':
        return null
      case 'HomeworkDraw':
        return null
      case 'AdverisementDetails':
        return null
      default:
        return configure.gestures
    }
  }

}