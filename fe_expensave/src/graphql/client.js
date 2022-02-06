import axios from "axios";

const exsave = async ({query, variables}) => {
    return await axios({
        method: "POST",
        url: "http://localhost:3000/expensave",
        data: {
            query,
            variables
        }
    });
};

export default exsave;