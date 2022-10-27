import { Text } from "react-native"
import ColorSet from "../style/ColorSet"

export const MyText = (props) => {
  const selectedColor = props.color ? props.color : "navy"
  const selectedSize = props.size ? parseInt(props.size) : 30

  const theme = {
    orange: ColorSet.orangeColor(1),
    navy: ColorSet.navyColor(1),
    yellow: ColorSet.yellowColor(1),
    paleBlue: ColorSet.paleBlueColor(1),
    green: ColorSet.greenColor(1),
  }

  return (
    <Text
      style={{
        color: theme[selectedColor],
        fontSize: selectedSize,
      }}
    >
      {props.children}
    </Text>
  )
}
