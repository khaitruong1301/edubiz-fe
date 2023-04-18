import { useEffect, useState } from 'react'



function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        widthWindow: window.innerWidth,
        heightWindow: window.innerHeight,
    })

    useEffect(() => {
        const handler = () => {
            setWindowSize({
                widthWindow: window.innerWidth,
                heightWindow: window.innerHeight,
            })
        }

        // Set size at the first client-side load
        handler()

        window.addEventListener('resize', handler)

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('resize', handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return windowSize
}

export default useWindowSize