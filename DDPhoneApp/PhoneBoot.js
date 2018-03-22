/**
 * Created by alan on 16/11/2.
 */
'use strict'
import React, { Component } from 'react'
import { BackHandler, Image, StatusBar, View } from 'react-native'

import { Navigator } from 'react-native-deprecated-custom-components'
import DeviceInfo from 'react-native-device-info-hfjy'
import RobotPen from 'react-native-robot-pen-hfjy'
import { Dialog } from 'react-native-classroom-hfjy'

import GuidePage from './app/phone/pages/guide/GuidePage'
import Main from './app/phone/pages/Main'
import { strings } from './app/res/values'
import AdvertisementIndex from './app/phone/pages/advertisementPage/AdvertisementIndex'

import { flux } from './Store'

export default class PhoneBoot extends Component {

  opened = null

  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      startAdverisement: null
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid)
    flux.storage.get('opened').then((res) => {
      this.opened = res
      this.time = setTimeout(() => {
        flux.storage.set('opened', true)
        this.setState({loaded: true})
      }, 2000)
    })

    flux.storage.get('startAdverisement').then((res) => {
      // console.log('1111 getStartAdverisement', res)
      this.setState({
        startAdverisement: JSON.parse(res),
      })
    }).catch((err) => {
    })
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid)
    this.time && clearTimeout(this.time)
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
          title: strings.exit,
          rightPress: () => {
            RobotPen.releaseSDK()
            BackHandler.exitApp()
          },
        })
        return true
      }
    }
  }

  render () {
    if (this.state.loaded) {
      return (
        <View style={{flex: 1}}>
          <StatusBar hidden={this.state.statusHidden}/>
          {this.renderNav()}
        </View>
      )
    } else {
      return (
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode={'cover'}
          source={require('./app/phone/images/image_start.png')}/>
      )
    }
  }

  renderNav = () => {
    const componentName = 'AdvertisementIndex'
    const component = AdvertisementIndex

    return (
      <Navigator
        ref='navigator'
        initialRoute={{
          component: this.opened ? component : GuidePage,
          name: this.opened ? componentName : 'GuidePage',
          params: {startAdverisement: this.state.startAdverisement}
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
          if (name === 'Main' || name === 'IM' || name === 'IMChat') {
            const {isAutoLogin} = flux.state.userInfo
            if (isAutoLogin === 1) {
              flux.dispatch.startTickServer().catch(() => {})
              flux.dispatch.serverFront('getMessage').catch(() => {})
            } else {
              flux.dispatch.serverStop('getMessage').catch(() => {})
            }
          } else {
            flux.dispatch.serverStop('getMessage').catch(() => {})
          }

          return (
            <View style={[{width: '100%', height: '100%'}, paddingB]}>
              <Component {...route.params} navigator={navigator}/>
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