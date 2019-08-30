import AppIndex from "../Models/AppIndex";

interface AppIndexer {
    index() : Promise<AppIndex[]>
}

export default AppIndexer