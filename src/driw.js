import axios from "axios";
import { baseURL } from "./driw.config";

const driw = axios.create({ baseURL });

export default driw;
