/**
 * Created by zhangweili on 2017/1/3.
 */
'use strict'
import React, { PropTypes } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'

export default class Tab extends React.Component {

  static propTypes = {
    testID: PropTypes.string,
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    badge: PropTypes.element,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    hidesTabTouch: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    style: View.propTypes.style,
  }

  constructor (props, context) {
    super(props, context)

    this._handlePress = this._handlePress.bind(this)
  }

  render () {
    let {title, badge} = this.props
    let icon = null
    if (React.Children.count(this.props.children) > 0) {
      icon = React.Children.only(this.props.children)
    }

    if (title) {
      title =
        <Text
          numberOfLines={1}
          allowFontScaling={this.props.allowFontScaling}
          style={[styles.title, this.props.titleStyle]}>
          {title}
        </Text>
    }

    if (badge) {
      badge = React.cloneElement(badge, {
        style: [styles.badge, badge.props.style],
      })
    }

    let tabStyle = [
      styles.container,
      title ? null : styles.untitledContainer,
      this.props.style,
    ]
    return (
      <TouchableOpacity
        testID={this.props.testID}
        activeOpacity={this.props.hidesTabTouch ? 1.0 : 0.8}
        onPress={this._handlePress}
        onLongPress={this._handleLongPress.bind(this)}
        style={tabStyle}
        disabled={this.props.disabled}>
        <View>{icon}{badge}</View>
        {title}
      </TouchableOpacity>
    )
  }

  _handlePress (event) {
    if (this.props.onPress) {
      this.props.onPress(event)
    }
  }

  _handleLongPress (event) {
    if (this.props.onLongPress) {
      this.props.onLongPress()
    }
  }
}

let styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 0,
    right: -6,
  },
  // 设置tab间距
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    color: '#929292',
    fontSize: 10,
    textAlign: 'center',
    alignSelf: 'stretch',
    marginTop: 4,
  },
})
