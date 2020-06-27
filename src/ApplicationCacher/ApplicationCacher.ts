import AppIndexer from "../AppIndexer/AppIndexer";

class ApplicationCacher {
    appIndexers: AppIndexer[];

    constructor(indexers: AppIndexer[]) {
        this.appIndexers = indexers;
    }

    async cache() {
        let indices = {};

        for (let indexer of this.appIndexers) {
            let res = await indexer.index();

            for (let appIndex of res) {
                if (appIndex.exec) {
                    let appPath = appIndex.exec.split(" ")[0];
                    let key = appPath.split("/").slice(-1);
                    if (key[0]) indices[key[0]] = appIndex;
                }
            }
        }

        return Object.values(indices);
    }
}

export default ApplicationCacher;
