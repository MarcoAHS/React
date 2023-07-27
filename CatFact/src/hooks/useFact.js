import { useState } from 'react';
export function useFact() {
    const [ fact, setFact ] = useState();
    function updateFact(fact) {
        setFact(fact)
    }
    return { fact, updateFact }
}