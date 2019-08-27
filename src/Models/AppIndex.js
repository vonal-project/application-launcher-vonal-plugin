/**
 * @typedef {String} AppIndex~type
 * @value 'Application'
 * @value 'Link'
 * @value 'Directory'
 * @value 'Unknown'
 */

class AppIndex {
    /**
     * 
     * @param {Object} app
     * @param {String} app.name Specific name of the application, for example "Mozilla".
     * @param {String} app.path If entry is of type Application, the working directory to run the program in.
     * @param {String} app.version Version of the Desktop Entry Specification
     * @param {String} app.genericName Generic name of the application, for example "Web Browser".
     * @param {Boolean} app.noDisplay NoDisplay means "this application exists, but don't display it in the menus"
     * @param {String} app.comment Tooltip for the entry, for example "View sites on the Internet"
     * @param {String} app.icon Icon to display in file manager, menus, etc. 
     * If the name is an absolute path, the given file will be used. 
     * If the name is not an absolute path, the algorithm described in the Icon Theme Specification will be used to locate the icon
     * 
     * @param {Boolean} app.dBusActivatable  If the value is true then implementations should ignore the Exec key 
     * and send a D-Bus message to launch the application. 
     * See D-Bus Activation for more information on how this works. 
     * Applications should still include Exec= lines in their desktop files for compatibility 
     * with implementations that do not understand the DBusActivatable key.
     * 
     * @param {String} app.tryExec Path to an executable file on disk used to determine 
     * if the program is actually installed. 
     * If the path is not an absolute path, the file is looked up in the $PATH environment variable. 
     * If the file is not present or if it is not executable, 
     * the entry may be ignored (not be used in menus, for example).
     * 
     * @param {String} app.exec Program to execute, possibly with arguments. 
     * See the Exec key for details on how this key works. 
     * The Exec key is required if DBusActivatable is not set to true. 
     * Even if DBusActivatable is true, Exec should be specified for compatibility 
     * with implementations that do not understand DBusActivatable.
     * 
     * @param {String} app.path If entry is of type Application, the working directory to run the program in.
     * @param {Boolean} app.terminal Whether the program runs in a terminal window.
     * @param {AppIndex[]} app.actions Application actions. 
     * This can be used to tell the application to make a specific action, different from the default behavior. 
     * The Application actions section describes how actions work.
     * 
     * @param {String[]} app.mimeType The MIME type(s) supported by this application.
     * @param {String[]} app.categories Categories in which the entry should be shown in a menu 
     * (for possible values see the Desktop Menu Specification).
     * 
     * @param {String[]} app.implements A list of interfaces that this application implements. 
     * By default, a desktop file implements no interfaces. 
     * See Interfaces for more information on how this works.
     * 
     * @param {String[]} app.keywords A list of strings 
     * which may be used in addition to other metadata to describe this entry. 
     * This can be useful e.g. to facilitate searching through entries. 
     * The values are not meant for display, and should not be redundant with the values of Name or GenericName.
     * 
     * @param {Boolean} app.startupNotify If true, it is KNOWN that the application will send a "remove" message 
     * when started with the DESKTOP_STARTUP_ID environment variable set. 
     * If false, it is KNOWN that the application does not work with startup notification at all 
     * (does not shown any window, breaks even when using StartupWMClass, etc.). 
     * If absent, a reasonable handling is up to implementations 
     * (assuming false, using StartupWMClass, etc.). 
     * (See the Startup Notification Protocol Specification for more details).
     * 
     * @param {String} app.startupWMClass If specified, it is known that the application will map 
     * at least one window with the given string as its WM class or WM name hint 
     * (see the Startup Notification Protocol Specification for more details).
     * 
     * @param {String} app.URL If entry is Link type, the URL to access.
     * @param {AppIndex~type} app.type
     */
    constructor(app){
        this.name = app.name
        this.path = app.path
        this.type = (app.type) ? app.type : 'Application'
        this.version = app.version
        this.genericName = app.genericName
        this.noDisplay = app.noDisplay
        this.comment = app.comment
        this.icon = app.icon
        this.dBusActivatable = (app.dBusActivatable) ? app.dBusActivatable : false
        this.tryExec = app.tryExec
        this.exec = app.exec
        this.path = app.path
        this.terminal = app.terminal
        this.actions = app.actions
        this.mimeType = app.mimeType
        this.categories = app.categories
        this.implements = app.implements
        this.keywords = app.keywords
        this.startupNotify = app.startupNotify
        this.startupWMClass = app.startupWMClass
        this.URL = app.URL
    }
}

export default AppIndex