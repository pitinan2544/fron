import {createContext,useState,useEffect} from 'react'
import axios from 'axios'
const AuthContext = createContext()

function AuthContextProvider(props) {
    const[user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    // useEffect(()=>{
    //   const run = async () => {
    //   try {
    //     setLoading(true)
    //     let token = localStorage.getItem('token')
    //     if(!token){return }
    //     const rs = await axios.get('http://localhost:8889/user/me',{
    //       headers : { Authorization : `Bearer ${token}`}
    //     })
    //     setUser(rs.data)
    //   } catch (error) {
    //     console.log(err.message)
    //   }finally{
    //     setLoading(false)
    //   }
     
    //   }

    //   run()
    // },[])
    useEffect( ()=>{
      const run = async () => {
        try {
          setLoading(true)
          let token = localStorage.getItem('token')
          if(!token) { return }
          const rs = await axios.get('http://localhost:8889/auth/me', {
            headers : { Authorization : `Bearer ${token}` }
          })
          setUser(rs.data)
        }catch(err) {
          console.log(err.message)
        }finally {
          setLoading(false)
        }   
      }
      run()
    }, [])


    const logout = () =>{
      setUser (null)
      localStorage.removeItem('token')
    }

  return (
   < AuthContext.Provider value={{user,setUser,loading,logout}}>
    {props.children}
    
   </AuthContext.Provider>
  )
}

export {AuthContextProvider}
export default AuthContext