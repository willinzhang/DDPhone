import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Provider } from 'react-redux'
// import HotUpdate from 'react-native-hotupdate-hfjy'
// import SplashScreen from 'react-native-splash-hfjy'
// import Orientation from 'react-native-orientation-hfjy'
// import { ClearCache } from 'react-native-classroom-hfjy'
// import Social from 'react-native-social-hfjy'

// import { flux, store } from './Store'
// import PhoneBoot from './PhoneBoot'
/*
const SHARE_KEY = {
  wechatAppId: 'wx3dda9549fed5e222',
  wechatAppSecret: '41b0cfe9c9f0e98a3de516f2ec7b4c1c',
  // wechatAppId: 'wxc832a0d8e829075f',
  // wechatAppSecret: '7f3dbeb6ff29a30e7ceaf9fa2856d17c',
  qqAppId: '1104978838'
}
*/

export default class Start extends Component {

  constructor (props) {
    super(props)
    // const enter = !__DEV__ && flux.api.baseUrl === APIS.XUE.apiUrl
    // this.state = {enter: enter, hotStatusText: '点开始更新,暂无状态', devApis: []}
  }

  componentDidMount () {
    // SplashScreen.hide()
    // Orientation.lockToPortrait()
    // ClearCache()
    //分享
    // Social.configure(SHARE_KEY)
  }
/*
  _changeApiHost = (obj) => {
    const {storage, api, dispatch} = flux
    const {apiUrl, webUrl} = obj
    if (apiUrl === APIS.DEV.apiUrl) {
      api.setBaseUrl(apiUrl)
      dispatch.fetchXueVersionInfo().then((res) => {
        this.setState({branches: res.versions})
      })
    } else {
      WEBURL = webUrl
      api.setBaseUrl(apiUrl)
      storage.setPrefix(apiUrl)
      dispatch.resetState().then(() => {
        dispatch.appAutoLogin().then(() => {
          this.setState({enter: true})
        })
      })
    }
  }

  _hotUdate = () => {
    this.setState({hotStatusText: '点击更新,正在下载更新'})
    let url = Platform.OS === 'android' ? HOTDEV + '/android-version.json' : HOTDEV + '/ios-version.json'
    HotUpdate.downLoadUrl(url, (status, message) => {
      this.setState({hotStatusText: '点击更新,' + message})
    })
  }
*/
  render () {
    return (
        <PhoneBoot/>
    )
  }
/*
  _renderHosts = () => {
    const views = []
    for (const key in APIS) {
      if (APIS.hasOwnProperty(key)) {
        const host = APIS[key]
        views.push(
          <View
            key={key}
            style={styles.content}>
            <TouchableOpacity onPress={() => this._changeApiHost(host)}>
              <Text style={styles.host}>
                {key}
              </Text>
            </TouchableOpacity>
            {key === 'DEV' && this._renderBranches(host)}
          </View>
        )
      }
    }
    return views
  }

  _renderBranches = (obj) => {
    const {branches} = this.state
    return branches && branches.map((item, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => this._changeApiHost({...obj, apiUrl: `${obj.apiUrl}xue/${item.text}/`})}>
        <Text
          style={styles.branch}>
          {item.text}
        </Text>
      </TouchableOpacity>
    ))
  }
*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  host: {
    fontSize: 20,
    padding: 20,
    color: 'black'
  },
  branch: {
    fontSize: 18,
    padding: 10,
    color: 'grey'
  }
})