import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface UserInfo {
  email?: string;
  isAdmin?: boolean;
  isStore?: boolean;
  approved?:boolean;
  address?:string;
  detailedAddress?:string;
  postalCode?:string;
  storeLogo?:string;
  storeName?:string;
  requestDeclined?:boolean;
  id:string
}

interface UserContextProps {
  userInfo: UserInfo | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
}

const defaultValue: UserContextProps = {
  userInfo: null,
  setUserInfo: () => {},
};

export const UserContext = createContext<UserContextProps>(defaultValue);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({children}: UserContextProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}
