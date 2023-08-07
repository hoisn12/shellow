import React from "react";
import Home from "@/pages/Home/index";
import { createRoot } from 'react-dom/client';



const rootNode = document.getElementById('root');

createRoot(rootNode)
.render(<Home />)

