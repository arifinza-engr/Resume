import React from "react";

export interface StyleContextType {
  isDark: boolean;
  changeTheme: () => void;
}

const StyleContext = React.createContext<StyleContextType>({
  isDark: false,
  changeTheme: () => {}
});

export const StyleProvider = StyleContext.Provider;
export const StyleConsumer = StyleContext.Consumer;

export default StyleContext;
