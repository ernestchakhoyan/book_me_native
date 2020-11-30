import { getItemFromStorage } from "../services/storage";

const isAuthorized = async () => {
    await getItemFromStorage("access_token");
}

export {isAuthorized};