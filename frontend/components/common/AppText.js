import React from "react-native"

import { Text } from "react-native"
import ColorSet from "../../style/ColorSet"
import { RFPercentage } from "react-native-responsive-fontsize"

/*
Text 컴포넌트
color prop
아래 theme 5개 중 하나를 선택해서 넣고

size prop
숫자를 넣습니다.

기본값은 각각 navy, 3입니다.
*/
const AppText = (props) => {
  const selectedColor = props.color ? props.color : "navy"
  const selectedSize = props.size ? parseInt(props.size) : 3

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
        fontSize: RFPercentage(selectedSize),
        fontFamily: "HyeminRegular",
      }}
    >
      {props.children}
    </Text>
  )
}

export default AppText
