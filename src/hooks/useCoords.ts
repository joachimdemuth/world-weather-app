import { useState, useEffect, useMemo } from "react";

const useCoords = (initialCoords: [number, number]) => {
    const [coords, setCoords] = useState<[number, number]>(initialCoords);

    const updateCoords = (newCoords: [number, number]) => {
        setCoords(newCoords);
    }

    return useMemo(() => ({ coords, updateCoords }), [coords]);
}

export default useCoords;