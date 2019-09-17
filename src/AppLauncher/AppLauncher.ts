import AppIndex from '../Models/AppIndex'
import { spawn } from 'child_process'

class AppLauncher {
    launch(appIndex: AppIndex) : void {
        const exec: string[] = appIndex
            .exec

            /*
             * %f
             * A single file name, even if multiple files are selected. 
             * The system reading the desktop entry should recognize that the program in question cannot handle multiple file arguments, 
             * and it should should probably spawn and execute multiple copies of a program for each selected file 
             * if the program is not able to handle additional file arguments. 
             * If files are not on the local file system (i.e. are on HTTP or FTP locations), 
             * the files will be copied to the local file system and %f will be expanded to point at the temporary file. 
             * Used for programs that do not understand the URL syntax. 
             */
            .replace(/%f/,'') 

            /* 
             * %F
             * A list of files. Use for apps that can open several local files at once. 
             * Each file is passed as a separate argument to the executable program.
             */
            .replace(/%F/,'') 

            /* A single URL. Local files may either be passed as file: URLs or as file path. */
            .replace(/%u/,'') 

            /* 
             * A list of URLs. 
             * Each URL is passed as a separate argument to the executable program. 
             * Local files may either be passed as file: URLs or as file path. 
             */
            .replace(/%U/,'') 

            /* 
             * The Icon key of the desktop entry expanded as two arguments, first --icon and then the value of the Icon key. 
             * Should not expand to any arguments if the Icon key is empty or missing. 
             */
            .replace(/%i/,'') 

            /* The translated name of the application as listed in the appropriate Name key in the desktop entry. */
            .replace(/%c/,'') 

            /* The location of the desktop file as either a URI (if for example gotten from the vfolder system) 
             * or a local filename or empty if no location is known. 
             */
            .replace(/%k/,'') 

            /* Deprecated */
            .replace(/%(v|m|d|D|n|N|)/,'') // Deprecated.

            /**
             * We should hold single spaces
             */
            .replace(/ +/,' ')

            /**
             * Every part should be separated
             */
            .split(' ')

        const execuatble = exec.slice(0,1)[0]
        const args = exec.slice(1)
        spawn(execuatble, args, { detached: true, stdio: 'ignore' }).unref()
    }
}

export default AppLauncher