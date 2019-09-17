enum AppIndexType { Application, Link, Directory, Unknown }

class AppIndex {
    name: string
    exec: string

    path?: string | undefined
    version?: string | undefined
    genericName?: string | undefined
    noDisplay?: boolean | undefined
    comment?: string | undefined
    icon?: string | undefined
    dBusActivatable?: boolean | undefined
    tryExec?: string | undefined
    terminal?: boolean | undefined
    actions: AppIndex[] = []
    mimeType: string[] = []
    categories: string[] = []
    implements: string[] = []
    keywords: string[] = []
    startupNotify?: boolean | undefined
    startupWMClass?: string | undefined
    URL?: string | undefined
    type?: AppIndexType | undefined

    fuzzybuzz?: string | undefined
}

export default AppIndex