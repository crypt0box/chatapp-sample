import { styled } from "../stitches-config";

export const Layout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  height: "100vh",
});

export const LayoutMain = styled("div", {
  flex: 1,
  paddingTop: "$4",
  paddingBottom: "$4",
});

export const LayoutBottom = styled("div", {
  position: "sticky",
  bottom: "0",
  backgroundColor: "White",
});
