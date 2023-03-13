import {useCallback, useState} from "react";

const useHttp = () => {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')

    const request = useCallback(async (url,method='GET',body=null,headers={'Content-Type':'application/json'})=>{
        setLoading(true)
        setError('')

        try {
            let response = await fetch(url,{method,body,headers})
            if (!response.ok) throw new Error(`Could not fetch ${url} , status: ${response.status}`)
            return await response.json()
        } catch (e) {
            setError(e.message )
            console.log('Error on useHttp --> ',e)
            throw e
        } finally {
            setLoading(false)
        }

    },[])

    return {request,loading,error}
}
 export default useHttp
