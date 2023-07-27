import { useState } from "react";
export function useGif() {
    const [ gif, setGif ] = useState();
    function updateGif(gif){
        setGif(gif)
    }
    return { gif, updateGif }
}