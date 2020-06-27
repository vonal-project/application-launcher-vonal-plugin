import fs, { promises as fsp } from "fs";
import AppIndex from "../Models/AppIndex";
import AppIndexer from "./AppIndexer";
import path from "path";
import XDGParse from "xdg-parse";

/**
 * Creates application indexes from .desktop files
 */
class DesktopIndexer implements AppIndexer {
    /**
     * These files usually reside in
     * /usr/share/applications/ or /usr/local/share/applications/ for applications installed system-wide,
     * or ~/.local/share/applications/  for user-specific applications.
     * User entries take precedence over system entries.
     */
    async index() {
        return [
            ...(await this._indexFrom(
                path.join(process.env.HOME, ".local/share/applications/")
            )),
            ...(await this._indexFrom("/usr/share/applications/")),
            ...(await this._indexFrom("/usr/local/share/applications/")),
        ];
    }

    /**
     *
     * @param {string} from
     */
    async _indexFrom(from) {
        try {
            let realPathFrom = await fsp.realpath(from);
            let entries = await fsp.readdir(realPathFrom);

            return entries
                .filter((entry) => entry.match(/\.desktop$/))
                .map((entry) =>
                    fs.readFileSync(path.join(realPathFrom, entry), "utf8")
                )
                .map((content) => XDGParse(content))
                .map((parsed) =>
                    this._makeAppIndexFromParsedDesktopFile(
                        parsed,
                        "Desktop Entry"
                    )
                );
        } catch (e) {
            return [];
        }
    }

    /**
     *
     * @param {Object} content
     */
    _makeAppIndexFromParsedDesktopFile(content, entry) {
        let mainEntry = content[entry];
        if (mainEntry) {
            if (!mainEntry.Actions) mainEntry.Actions = "";
            if (!mainEntry.MimeType) mainEntry.MimeType = "";
            if (!mainEntry.Actions) mainEntry.Actions = "";
            if (!mainEntry.Categories) mainEntry.Categories = "";
            if (!mainEntry.Implements) mainEntry.Implements = "";
            if (!mainEntry.Keywords) mainEntry.Keywords = "";
            if (!mainEntry.NoDisplay) mainEntry.NoDisplay = "false";
            if (!mainEntry.DBusActivatable) mainEntry.DBusActivatable = "false";
            if (!mainEntry.StartupNotify) mainEntry.StartupNotify = "false";

            let appIndex: AppIndex = {
                name: mainEntry.Name,
                path: mainEntry.Path,
                type: mainEntry.Type,
                version: mainEntry.Version,
                genericName: mainEntry.GenericName,
                noDisplay: mainEntry.NoDisplay == "true" ? true : false,
                comment: mainEntry.Comment,
                icon: mainEntry.Icon,
                dBusActivatable:
                    mainEntry.DBusActivatable == "true" ? true : false,
                tryExec: mainEntry.TryExec,
                exec: mainEntry.Exec,
                terminal: mainEntry.Terminal,
                actions: mainEntry.Actions.split(";")
                    .map((action) =>
                        this._makeAppIndexFromParsedDesktopFile(
                            content,
                            "Desktop Action " + action
                        )
                    )
                    .filter((action) => action),
                mimeType: mainEntry.MimeType.split(";"),
                categories: mainEntry.Categories.split(";"),
                implements: mainEntry.Implements.split(";"),
                keywords: mainEntry.Keywords.split(";"),
                startupNotify: mainEntry.StartupNotify == "true" ? true : false,
                startupWMClass: mainEntry.StartupWMClass,
                URL: mainEntry.URL,
            };

            return appIndex;
        }
    }
}

export default DesktopIndexer;
