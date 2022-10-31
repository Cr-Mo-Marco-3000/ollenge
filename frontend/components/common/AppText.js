<<<<<<< HEAD
import React from "react-native"
=======
import React from "react"

>>>>>>> develop
import { Text } from "react-native"
import ColorSet from "../../style/ColorSet"
import { RFPercentage } from "react-native-responsive-fontsize"

/*
Text 컴포넌트
color prop
아래 theme 5개 중 하나를 선택해서 넣고

size prop
숫자를 넣습니다.

weight prop
'normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'
중 1개를 택해서 넣습니다.

기본값은 각각 navy, 30px입니다.

*/
const AppText = (props) => {
  const selectedColor = props.color ? props.color : "navy"
  const selectedSize = props.size ? parseInt(props.size) : 30
  const selectedWeight = props.weight ? props.weight : "normal"

  const theme = {
    orange: ColorSet.orangeColor(1),
    navy: ColorSet.navyColor(1),
    yellow: ColorSet.yellowColor(1),
    paleBlue: ColorSet.paleBlueColor(1),
    green: ColorSet.greenColor(1),
    black: ColorSet.blackColor(1),
    deepOrange: ColorSet.deepOrangeColor(1),
  }

  return (
    <Text
      style={{
        color: theme[selectedColor],
        fontSize: selectedSize,
        fontWeight: selectedWeight,
      }}
    >
      {props.children}
    </Text>
  )
}

export default AppText
