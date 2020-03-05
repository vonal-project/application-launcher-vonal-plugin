import ApplicationLauncherRow from './Components/ApplicationLauncherRow'
import PathIndexer from './AppIndexer/PathIndexer'
import ApplicationCacher from './ApplicationCacher/ApplicationCacher';
import DesktopIndexer from './AppIndexer/DesktopIndexer';
import AppIndex from './Models/AppIndex';
import path from 'path'

const pathIndexer = new PathIndexer()
const desktopIndexer = new DesktopIndexer()
const applicationCacher = new ApplicationCacher([pathIndexer, desktopIndexer])
const addon = require(path.join(__dirname, 'native/index.node'));
let indices = null

let load_cache = () => {
    applicationCacher.cache().then(given_indices => {
        indices = given_indices
        indices.forEach((idx: AppIndex) => {
            idx.fuzzybuzz = idx.name + idx.exec + idx.genericName + idx.keywords.join(',')
        });
    })
}

load_cache()

/**
 * This is responsible for the fuzzy search
 * @param {string} q 
 */
async function getResults(q) {
    if (q.length == 0) return []
    if (!indices) return []
    q = q.split(' ')
    let results = addon.search(q[0], indices)
    return results
}


export default async (q) => {
    if(q.match(/^[a-zA-Z]+(\s.*)?$/)) {

        let results = (await getResults(q))
            .slice(0, 5) // show only the first 5
            .map(fuzzyInfo => <ApplicationLauncherRow fuzzyInfo={fuzzyInfo} query={q} />)

        return [
            ...results,
            <div className="row">
                <button onClick={load_cache} style={{ opacity: 0.5 }}>Reload application cache</button>
                <div style={{ float: 'right', paddingRight: '0.5rem' }}>application-launcher settings</div>
            </div>
        ]
    }

    return null
}
