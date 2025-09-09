import { StyleSheet } from "react-native";
import colors from "./colors";
import fonts from "./fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 16,
  },
  title: {
    fontSize: fonts.size.large,
    fontWeight: "bold",
    color: colors.primary,
  },
  text: {
    fontSize: fonts.size.medium,
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.textLight,
    fontWeight: "bold",
  },
});
