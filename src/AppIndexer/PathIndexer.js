import fs, { promises as fsp } from 'fs'
import AppIndex from '../Models/AppIndex'
import AppIndexer from './AppIndexer'
import path from 'path'

/**
 * Creates application indexes from the PATH env variable
 */

class PathIndexer extends AppIndexer {
    

    async index() {
        let dirsToIndex = process.env.PATH.split(':')

        let indices = []

        for(let dir of dirsToIndex)
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
            let entries = await fsp.readdir(from)
            return entries
                .filter(async entry => this._isExecutable(
                    path.join(from, entry)
                ))
                .map(entry => new AppIndex({
                    name: entry,
                    path: path.join(from, entry)
                }))
        } catch(e) {
            return []
        }
    }

    async _isExecutable(filePath) {
        try {
            return await fsp.access(
                filePath,
                fs.constants.X_OK
            )
        } catch(e) {
            return false
        }
    }
}

export default PathIndexer