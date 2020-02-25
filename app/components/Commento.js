import React, {useEffect} from 'react'
import useScript from "../hooks/useScript"
import useRemoveScript from '../hooks/useRemoveScript'
const Commento = ({id}) => {
    useEffect(() => {
        // If there's no window there's nothing to do for us

            useScript(`https://cdn.commento.io/js/commento.js`);
        return () => useRemoveScript(`commento-script`, document.body);
    }, [id]);
    return <div id={`commento`} />
};

export default Commento;