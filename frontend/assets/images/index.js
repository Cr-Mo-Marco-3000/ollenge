import Orange from "./orange.png";
import Google from "./google-icon.png";
import Kakao from "./kakao-icon.png";
import { Image } from "react-native";

export function OrangeLogo() {
  return (
    <Image
      source={Orange}
      style={{ width: "100%", zIndex: -1 }}
      resizeMode="contain"
    />
  );
}

export function KakaoLogo() {
  return (
    <Image
      source={Kakao}
      style={{ width: "100%", height: "100%" }}
      resizeMode="contain"
    />
  );
}

export function GoogleLogo() {
  return (
    <Image
      source={Google}
      style={{ width: "100%", height: "100%" }}
      resizeMode="contain"
    />
  );
}
