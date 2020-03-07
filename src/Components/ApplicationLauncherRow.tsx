
import React from 'react'
import AppIndex from '../Models/AppIndex';
import AppLauncher from '../AppLauncher/AppLauncher';
import './ApplicationLauncherRow.scss';

class ApplicationLauncherRow extends React.PureComponent<any, any> {
    appLauncher: AppLauncher = new AppLauncher()
    props: {
        fuzzyInfo: { object: AppIndex, segments: Array<String>, fitness: number },
        query: String
    };

    handleStart = (appIndex) => {
        let params = this.props.query.split(' ').slice(1)

        // hide Vonal and clear query
        const globalRef: any = global
        globalRef.PluginEventHandler.send('window:hide')
        globalRef.PluginEventHandler.send('query:clear')

        // launch
        this.appLauncher.launch(appIndex, params)
    }

    highlight_segments(x: String, segments: Array<String>) {
        return x
            .replace(new RegExp("(" + segments.join("|") + ")", "ig"), "|$1|")
            .replace(/\|+/g, "|")
            .split("|")
            .map(x => (segments.indexOf(x.toLowerCase()) != -1) ? <span>{x}</span> : x)
    }

    render() {
        let segments = this.props.fuzzyInfo.segments.map(segment => segment.toLowerCase())
        let name = this.highlight_segments(this.props.fuzzyInfo.object.name, segments)
        let exec = this.highlight_segments(this.props.fuzzyInfo.object.exec, segments)

        return <div className="row">
            Launch
            <button onClick={() => this.handleStart(this.props.fuzzyInfo.object)}>
                <div className="name">{name}</div>
                <div className="exec"> {exec}</div>
            </button>
            {this.props.fuzzyInfo.object.actions.map(actionAppIndex =>
                <button onClick={() => this.handleStart(actionAppIndex)} className="action">
                    <div className="name">{this.highlight_segments(actionAppIndex.name, segments)}</div>
                    <div className="exec"> {this.highlight_segments(actionAppIndex.exec, segments)}</div>
                </button>
            )}
        </div>
    }
}

export default ApplicationLauncherRow