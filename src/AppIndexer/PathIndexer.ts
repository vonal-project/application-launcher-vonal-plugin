import fs, { promises as fsp } from 'fs'
import AppIndex from '../Models/AppIndex'
import AppIndexer from './AppIndexer'
import path from 'path'

/**
 * Creates application indexes from the PATH env variable
 */

class PathIndexer implements AppIndexer {


    async index() {
        let dirsToIndex = process.env.PATH.split(':')

        let indices = []

        for (let dir of dirsToIndex)
            indices = [
                ...indices,
                ...await this._indexFrom(dir)
            ]

        return indices
    }

    /**
     * 
     * @param {string} from 
     */
    async _indexFrom(from) {
        try {
            let realPathFrom = fs.realpathSync(from)
            let entries = await fsp.readdir(realPathFrom)
            return entries
                .filter(async entry => this._isExecutable(
                    path.join(realPathFrom, entry)
                ))
                .map(entry => {
                    let appIndex: AppIndex = {
                        name: entry,
                        exec: path.join(realPathFrom, entry),
                        actions: [],
                        mimeType: [],
                        categories: [],
                        implements: [],
                        keywords: []
                    }
                    return appIndex
                })
                
        } catch (e) {
            return []
        }
    }

    async _isExecutable(filePath) {
        try {
            return await fsp.access(
                filePath,
                fs.constants.X_OK
            )
        } catch (e) {
            return false
        }
    }
}

export default PathIndexer