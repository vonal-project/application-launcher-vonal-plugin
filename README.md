# application-launcher-vonal-plugin
An application launcher plugin for Vonal.

Features:  
[x] You can fuzzy-search apps.   
[x] The fuzzy search is accelerated by Rust, so you can get the results within 1 ms.  
[x] It supports .desktop files with actions.
[x] It supports apps specified in the PATH.  
[x] You can write arguments. For e.g: `chromium google.com` will launch Google by chromium.  
[ ] The fuzzy search will be improved by usage statistics.  
[ ] It will support icons.  
[ ] It will have better .desktop support. For e.g: you will be able to control d-bus serivces.  
[ ] Despite the modifiablity, It will have dedicated configurations.   

## Installation

1. Clone the repository into ~/.config/vonal/plugins
2. cd into the cloned directory
3. run `npm start`

## Troubleshooting

### If it compiles, but vonal says, the index.node is built with different version

This is because of electron. It needs the same electron version as vonal have. If this occurs update both vonal and this. 

### If it doesn't compile

May you miss some libs for e.g: rustc, cargo, however it shouldn't be neccessary. It is more likely to be need for a full system update. You also can try to delete node_modules folder.
