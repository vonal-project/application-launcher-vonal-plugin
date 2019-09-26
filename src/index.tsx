import fuzzysort from 'fuzzysort'
import ApplicationLauncherRow from './Components/ApplicationLauncherRow'
import PathIndexer from './AppIndexer/PathIndexer'
import ApplicationCacher from './ApplicationCacher/ApplicationCacher';
import DesktopIndexer from './AppIndexer/DesktopIndexer';
import AppIndex from './Models/AppIndex';
import path from 'path'

let pathIndexer = new PathIndexer()
let desktopIndexer = new DesktopIndexer()
let applicationCacher = new ApplicationCacher([pathIndexer, desktopIndexer])
let indices = null

let addon : any = require(path.join(__dirname,'native'));
console.log(addon.hello("szia", ["halsz","szia","hello","jo","jatek"]))

let load_cache = () => {
    applicationCacher.cache().then(given_indices => {
        indices = given_indices
        indices.forEach( (idx : AppIndex) => {
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
    if (!indices) return null
    let results = []
    //let results = addon.fuzzysort(q, indices)
    return results
}

export default async (q) => {
    let results = (await getResults(q))
        .slice(0, 5) // show only the first 5
        .map(appIndex => <ApplicationLauncherRow appIndex={appIndex.obj} />)

    return [
        ...results,
        <div className="row">
            <button onClick={load_cache} style={{ opacity: 0.5 }}>Reload application cache</button>
            <div style={{ float: 'right', paddingRight: '0.5rem' }}>application-launcher-vonal-plugin settings</div>
        </div>
    ]

}