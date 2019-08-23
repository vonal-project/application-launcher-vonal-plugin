import fuzzysort from 'fuzzysort'
import ApplicationLauncherRow from './Components/ApplicationLauncherRow'
import PathIndexer from './AppIndexer/PathIndexer'
import ApplicationCacher from './ApplicationCacher/ApplicationCacher';

let pathIndexer = new PathIndexer()
let applicationCacher = new ApplicationCacher([pathIndexer])
let indices = null

let load_cache = () => {
    applicationCacher.cache().then(given_indices => {
        indices = given_indices
    })
}

load_cache()

/**
 * This is responsible for the fuzzy search
 * @param {string} q 
 */
async function getResults(q) {
    if(!indices) return null

    let results = fuzzysort.go(q, indices, { key: 'name' })
    return results
}

export default async (q) => {
    let results = (await getResults(q))
        .slice(0, 5) // show only the first 5
        .map(appIndex => <ApplicationLauncherRow appIndex={appIndex.obj} />)
    
    return [
        ...results,
        <div className="row">
            <button onClick={load_cache} style={{opacity:0.5}}>Reload application cache</button>
            <div style={{float:'right', paddingRight:'0.5rem'}}>application-launcher-vonal-plugin settings</div>
        </div>
    ]

}