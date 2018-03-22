/**
 * Created by alan on 16/9/27.
 */
import React, { PureComponent } from 'react'
import { Image, InteractionManager, Linking, Platform, StyleSheet, View } from 'react-native'

// import DeviceInfo from 'react-native-device-info-hfjy'
// import Toast from 'react-native-toast-hfjy'
import First from './First'
import Second from './Second'
import { BaseTabNavigator } from './../../componet'


const titles = ['首页', '微课']
/*
const icons = [
  'tab_home',
  'tab_teacher',
  'tab_1on1',
  'tab_bag',
  'tab_me',
]
const iconsActive = [
  require('./../../phone/images/homeac.png'),
  require('./../../phone/images/teacherac.png'),
  require('./../../phone/images/icon1on1ac.png'),
  require('./../../phone/images/schoolbagac.png'),
  require('./../../phone/images/meac.png'),
]
const iconsInActive = [
  require('./../../phone/images/homeinac.png'),
  require('./../../phone/images/teacherinac.png'),
  require('./../../phone/images/icon1on1inac.png'),
  require('./../../phone/images/schoolbaginac.png'),
  require('./../../phone/images/meinac.png'),
]
*/
const iconColors = [
  '#0099ff',
  '#6d69dd',
]
const components = [First,Second]

export default class Main extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      selectedTab: this.props.selectedTab,
    }
  }

  static propTypes = {
    selectedTab: React.PropTypes.number,
  }

  static get defaultProps () {
    return {
      selectedTab: 0,
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {

    })
  }

  componentWillUnmount () {

  }

  /*
  _checkUpdate = () => {
    this.props.dispatch.getCheckAppVersionUpdate({
      versionCode: DeviceInfo.getBuildNumber(),
      platformType: Platform.OS === 'ios' ? 1 : 2,
    }).then((res) => {
      console.log('test', JSON.stringify(res))
      if (!VerifyUtils.isEmpty(res)) {
        const {update} = this.refs
        const {downloadDesc, forceUpdateFlag, deviceVersionUrl} = res
        update && update.show(
          downloadDesc,
          forceUpdateFlag === '1',
          () => {
            const {downLoadUrl} = JSON.parse(deviceVersionUrl)[0]
            if (Platform.OS === 'ios') {
              Linking.openURL(downLoadUrl)
            } else {
              NativeToolsUtils.downloadApk(downLoadUrl)
            }
          }
        )
      }
    })
  }
*/

  /**
   * 查询是否苹果审核接口
   * @private
   */
  /*
  _moduleIsOpen = () => {
    this.props.dispatch.moduleIsOpen({
      platformType: 1, // 1为phone 3为 pad
      version: DeviceInfo.getVersion(),
      bundleIdentifier: DeviceInfo.getBundleId(),
    }).then((res) => {
      // 1为审核完 0为审核中
      this.setState({isAudit: res.isOpen})
    }).catch(() => {
      this.setState({isAudit: 0})
    })
  }
*/
  _selectTab = (tab) => {
        this.setState({selectedTab: tab})
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <BaseTabNavigator
          tabBarStyle={styles.tabNavigator}
          hidesTabTouch={true}
          removeClippedSubviews={false}>
          {this._renderTabs()}
        </BaseTabNavigator>
      </View>
    )
  }

  _renderTabs = () => {
    return titles.map((_, index) => this._renderTab(index))
  }

  _currentPageSelectTab = (tab) => {
    this._selectTab(tab)
  }

  _renderTab = (index) => {
    const {navigator} = this.props
    const {selectedTab} = this.state
    const title = titles[index]
    const Component = components[index]
    let iconColor = iconColors[index]
    return (
      <BaseTabNavigator.Item
        key={index}
        title={title}
        selected={selectedTab === index}
        selectedTitleStyle={[styles.selectedTextStyle, {color: iconColor}]}
        titleStyle={styles.textStyle}
        // renderIcon={() => this._renderIcon(index, false)}
        // renderSelectedIcon={() => this._renderIcon(index, true)}
        // renderBadge={() => (
        //   index === 4 && imCount > 0 ? (
        //     <View style={styles.badge}/>
        //   ) : null
        // )}
        onPress={this._currentPageSelectTab.bind(this, index)}>
        <Component
          navigator={navigator}
          // clickRightBtn={this._showLoginDialog}
          selectedTab={selectedTab}
          selectedTabIndex={(tab) => {
            this._selectedTabIndex(tab)
          }}
          />
      </BaseTabNavigator.Item>
    )
  }
/*
  _renderIcon = (index, selected) => {
    return (
      <Image source={selected ? iconsActive[index] : iconsInActive[index]}/>
    )
  }

  _showLoginDialog = () => {
    const {userInfo, navigator} = this.props
    if (userInfo.isAutoLogin === 0) {
      NavigatorUtils.push(navigator, 'Login', Login)
    } else {
      this.setState({isLogin: true})
    }
  }
*/
  _checkDevice = (device) => {
    switch (device) {
      case 1 :
        return 'aphone'
      case 2:
        return 'iphone'
      case 3:
        return 'apad'
      case 4:
        return 'ipad'
    }
  }

  _selectedTabIndex = (tab) => {
    this._selectTab(tab)
  }

}

const styles = StyleSheet.create({
  textStyle: {
    color: '#333333',
    height: 13,
    backgroundColor: 'transparent',
    marginTop: 3,
    fontSize: 11,
  },
  selectedTextStyle: {
    marginTop: 3,
    height: 13,
    color: 'blue',
    fontSize: 11,
  },
  tabNavigator: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  badge: {
    width: 8,
    height: 8,
    backgroundColor: '#ff0000',
    borderRadius: 4,
  },
})
