import server from "./index.js";
import 'dotenv/config';
const port = 3400;
server.listen(port, (err) => {
    if (err) console.log("ERROR :: server.js :: Server listen Error")

    console.log("Server is live on PORT --> 3400");
});
