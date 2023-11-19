import { createContext, useState} from 'react';
export const AppContext = createContext(); 

export function AppContextProvider({children})
{
     // {console.log(Data)}
     const[login,setLogin]=useState(true); 
     const[items,setItems]=useState(null); 
     const value = {
      login , 
      setLogin,
      items, 
      setItems
     }
     return <AppContext.Provider value={value}>
      {children}
     </AppContext.Provider>
}