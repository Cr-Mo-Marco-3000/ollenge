import React from "react-native"

import { Text } from "react-native"
import ColorSet from "../../style/ColorSet"
import { RFPercentage } from "react-native-responsive-fontsize"

/*

Text 컴포넌트

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
둘 중 하나를 취사선택해서 쓰시기 바랍니다.

*/
const AppText = (props) => {
  const selectedColor = props.color ? props.color : "navy"

  const RFP = props.size ? RFPercentage(props.size) : RFPercentage(3)

  const pxSize = props.pxSize ? props.pxSize : 24

  const selectedSize = props.size ? RFP : pxSize

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
  }

  return (
    <Text
      style={{
        color: theme[selectedColor],
        fontSize: selectedSize,
        fontFamily: "HyeminRegular",
        textAlign: "center",
      }}
    >
      {props.children}
    </Text>
  )
}

export default AppText
