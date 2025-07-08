import { createContext } from "react";

export const HomeElement = createContext({})

const HomeElementProvider = ({children}) => {

  return <HomeElement.Provider value = {{

  }}>{children}</HomeElement.Provider>
}
export default HomeElementProvider;