import React from 'react'
import { BackHandler, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'

import RootSiblings from 'react-native-root-siblings'

import { Colors, Strings } from '../res'

const DefaultState = {
  leftVisible: false,
  canHide: true,
  title: '',
  subTitle: null,
  leftText: Strings.cancel,
  leftColor: Colors.text_black,
  leftPress: null,
  rightText: Strings.confirm,
  rightColor: Colors.hfBlue,
  rightPress: null
}

let dialog

export default class ClassDialog {

  static show = (obj) => {
    ClassDialog.hide()
    const state = {...DefaultState, ...obj}
    dialog = new RootSiblings(
      render(state)
    )
    dialog.listener = BackHandler.addEventListener('hardwareBackPress', () => {
      ClassDialog.hide(state.canHide)
      return true
    })
  }

  static hide = (canHide = true) => {
    if (dialog && canHide) {
      dialog.listener.remove()
      dialog.destroy()
      dialog = null
    }
  }

}

const onPress = (block) => {
  requestAnimationFrame(() => {
    ClassDialog.hide()
    if (block) {
      block()
    }
  })
}

const render = (state) => {
  const {title, subTitle, canHide, leftVisible, leftPress, leftColor, leftText, rightPress, rightColor, rightText} = state
  return (
    <View style={{width: '100%', height: '100%'}}>
      <TouchableWithoutFeedback onPress={() => ClassDialog.hide(canHide)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.dialog}>
              <Text
                style={styles.title}
                allowFontScaling={false}>
                {title}
              </Text>
              {subTitle && (
                <Text
                  style={styles.subTitle}
                  allowFontScaling={false}>
                  {subTitle}
                </Text>
              )}
              <View style={styles.buttonContainer}>
                {leftVisible && (
                  <TouchableHighlight
                    style={styles.leftButton}
                    underlayColor={Colors.hfWhite}
                    onPress={() => onPress(leftPress)}>
                    <Text
                      style={{fontSize: 16, color: leftColor}}
                      allowFontScaling={false}>
                      {leftText}
                    </Text>
                  </TouchableHighlight>
                )}
                {leftVisible && (
                  <View style={styles.line}/>
                )}
                <TouchableHighlight
                  style={[styles.rightButton, {borderBottomLeftRadius: leftVisible ? 0 : 4}]}
                  underlayColor={Colors.hfWhite}
                  onPress={() => onPress(rightPress)}>
                  <Text
                    style={{fontSize: 16, color: rightColor}}
                    allowFontScaling={false}>
                    {rightText}
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.black_middle,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: 4,
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    color: Colors.text_black,
    fontSize: 16,
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25
  },
  subTitle: {
    color: Colors.grey,
    fontSize: 14,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    marginTop: 15,
    borderTopColor: Colors.border_shallow,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  leftButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 4,
  },
  rightButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 4
  },
  line: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border_shallow
  }
})