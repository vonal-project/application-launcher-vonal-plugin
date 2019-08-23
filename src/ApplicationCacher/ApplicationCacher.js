

class ApplicationCacher {
    /**
     * 
     * @param {AppIndexer[]} indexers 
     */
    constructor(indexers) {
        this.appIndexers = indexers
    }

    async cache() {
        let indices = []

        for(let indexer of this.appIndexers) {
            indices = [
                ...indices,
                ...(await indexer.index())
            ]
        }
        
        return indices
    }
}

export default ApplicationCacher