import { spawn } from 'child_process'
import { ipcRenderer } from 'electron'
class ApplicationLauncherRow extends React.PureComponent {

    handleStart = () => {
        spawn(this.props.appIndex.path, { detached: true, stdio: 'ignore' }).unref()

        // hide Vonal
        ipcRenderer.send('hide')
    }

    render() {
        return <div className="row">
            Launch
            <button onClick={this.handleStart}>{ this.props.appIndex.name }</button>
        </div>
    }
}

export default ApplicationLauncherRow