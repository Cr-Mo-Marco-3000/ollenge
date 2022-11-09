import React from "react-native"

import { Text } from "react-native"
import ColorSet from "../../style/ColorSet"
import { RFPercentage } from "react-native-responsive-fontsize"

/*

AppText

- props 설명

1) color
theme 5개 중 하나를 선택해서 넣습니다.
기본 색은 navy입니다.

2) size
RFPercentage에서 쓸 숫자를 넣습니다
기본값은 3입니다.

3) pxSize
일반적인 px 사이즈를 넣습니다.
기본값은 24px입니다.

Caution!!! 
만약 size와 pxSize가 둘 다 들어갔다면, 우선권은 size에 있습니다.
둘 다 들어가지 않았다면, RFPercentage(3)이 우선 적용됩니다.
둘 중 하나를 취사선택해서 쓰시기 바랍니다.

props를 넘겨줄 때의 형식은 아래와 같습니다.
size={3}
pxSize={24}

*/
const AppText = (props) => {
  const selectedColor = props.color ? props.color : "navy"
  const align = props.align ? props.align : "center"
  let selectedSize = 24

  if (!props.size && !props.pxSize) {
    selectedSize = RFPercentage(3)
  } else if (props.size && !props.pxSize) {
    selectedSize = RFPercentage(props.size)
  } else if (!props.size && props.pxSize) {
    selectedSize = props.pxSize
  } else if (props.size && props.pxSize) {
    selectedSize = RFPercentage(props.size)
  }

  const theme = {
    orange: ColorSet.orangeColor(1),
    navy: ColorSet.navyColor(1),
    yellow: ColorSet.yellowColor(1),
    paleBlue: ColorSet.paleBlueColor(1),
    green: ColorSet.greenColor(1),
    black: ColorSet.blackColor(1),
    deepOrange: ColorSet.deepOrangeColor(1),
    white: ColorSet.whiteColor(1),
    lightBlue: ColorSet.lightBlueColor(1),
    gray: ColorSet.grayColor(1),
    darkGray: ColorSet.darkGrayColor(1),
    hotPink: ColorSet.hotPinkColor(1),
  }

  return (
    <Text
      style={{
        color: theme[selectedColor],
        fontSize: selectedSize,
        fontFamily: "HyeminRegular",
        textAlign: align,
      }}
      numberOfLines={props.lineNumber ? props.lineNumber : 0}
    >
      {props.children}
    </Text>
  )
}

export default AppText
