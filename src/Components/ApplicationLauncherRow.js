import { spawn } from 'child_process'
class ApplicationLauncherRow extends React.PureComponent {

    handleStart = () => {
        spawn(this.props.appIndex.path, { detached: true, stdio: 'ignore' }).unref()

        // hide Vonal
        global.PluginEventHandler.send('window:hide')
        global.PluginEventHandler.send('query:clear')
    }

    render() {
        return <div className="row">
            Launch
            <button onClick={this.handleStart}>{ this.props.appIndex.name }</button>
        </div>
    }
}

export default ApplicationLauncherRow