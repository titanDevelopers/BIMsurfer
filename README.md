# BIMSurfer v3 beta

The all new BIM Surfer. Completly rebuild from scratch.  This version only works with WebGL 2.0 
It introduces 3D tiles and is focussed on high performance.

There is no official release yet, but feel free to contribute, test and evaluate this version.

Ako vyvíjať:

- v branch-i **releseas/titan** je aktuálna verzia, ktorú používame (všetky zmeny sa mergujú sem, z nej sa potom vytvorí nový balíček)
- stiahnuť fork, príp. clone repository (podľa opravnení)
- vytvoriť branch z releseas/titan, po zapracovaní zmien vytvoriť pull request do tejto branch

Nový surfer:

- ak vyjde nová verzia bim surfer, vytvoriť branch viď vyššie
- naviazať nadradené repo, ak ešte nie je -> https://help.github.com/en/articles/configuring-a-remote-for-a-fork
- prevziať jeho zmeny (tu nerobiť merge) -> https://help.github.com/en/articles/syncing-a-fork
- merge aktuálneho tagu napr. (bimsurfer3-0.0.264)
- v package.json zdvihnúť verziu (druhé číslo sa prevezme z tagu)
- a dať pull request, po merge-i spustiť script **npm run package** (právo má len Lukáš Šefčík a Ján Slivka)
