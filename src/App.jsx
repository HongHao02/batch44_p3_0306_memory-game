import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import router from "./routes/router";


function App() {

    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default App;
