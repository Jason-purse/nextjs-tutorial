import useSWR from "swr";
import {get} from "../../util/RequestUtil";

/**
 * swr 函数复用 ...
 */
const api = {
    fetchAuthorAvatar: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useSWR('/api/author/avatar', get)
    }
}

export default api;