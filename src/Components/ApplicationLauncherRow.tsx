
import React from 'react'
import AppIndex from '../Models/AppIndex';
import AppLauncher from '../AppLauncher/AppLauncher';

class ApplicationLauncherRow extends React.PureComponent<any, any> {
    appLauncher: AppLauncher = new AppLauncher()
    props: { appIndex: AppIndex };

    handleStart = (appIndex) => {
        this.appLauncher.launch(appIndex)

        // hide Vonal and clear query
        const globalRef: any = global
        globalRef.PluginEventHandler.send('window:hide')
        globalRef.PluginEventHandler.send('query:clear')
    }

    render() {
        return <div className="row">
            Launch
            <button onClick={() => this.handleStart(this.props.appIndex)}>{this.props.appIndex.name}</button>
            {this.props.appIndex.actions.map(actionAppIndex =>
                <button onClick={() => this.handleStart(actionAppIndex)}>{actionAppIndex.name}</button>
            )}
        </div>
    }
}

export default ApplicationLauncherRow