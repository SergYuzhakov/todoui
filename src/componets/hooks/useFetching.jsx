import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...arg) => {
        try {
            setError('')
            setIsLoading(true)
            await callback(...arg)

        } catch (e) {
            setError("Data Server Error!")
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}
