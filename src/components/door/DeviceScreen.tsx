import type { DoorScreen } from "@/lib/labs";
import DeviceFrame, { type DeviceSize } from "./DeviceFrame";
import ScreenImage from "./ScreenImage";

/** 기기 틀 하나에 화면 한 장 — 첫 화면과, 좁은 화면에서 일마다 서는 기기. */
export default function DeviceScreen({ screen, size = "default" }: { screen: DoorScreen; size?: DeviceSize }) {
  return (
    <DeviceFrame size={size}>
      <ScreenImage screen={screen} eager={size === "hero"} />
    </DeviceFrame>
  );
}
