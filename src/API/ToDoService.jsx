import axios from "axios";

export default class ToDoService {

    static async getAll(url, params) {
        const response = await axios.get(url, {params})
        return response;
    }

    static async patchToDo(url, params) {
        const response = await axios.patch(url, params)
            .catch(error => {
                return error.response.data
            })
        return response;
    }


    static async createToDo(url, params) {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.post(url, params, config)
            .catch(error => {
                return error.response.data
            })
        return response
    }
}
