import fs, { promises as fsp } from 'fs'
import AppIndex from '../Models/AppIndex'
import AppIndexer from './AppIndexer'
import path from 'path'

/**
 * Creates application indexes from .desktop files
 */

class DesktopIndexer extends AppIndexer {
    
    /**
     * These files usually reside in 
     * /usr/share/applications/ or /usr/local/share/applications/ for applications installed system-wide, 
     * or ~/.local/share/applications/  for user-specific applications. 
     * User entries take precedence over system entries.
     */
    async index() {
        return [
            ...await this._indexFrom('~/.local/share/applications/'),
            ...await this._indexFrom('/usr/share/applications/'),
            ...await this._indexFrom('/usr/local/share/applications/')
        ]
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
                    exec: path.join(from, entry),
                    path: from
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

export default DesktopIndexer