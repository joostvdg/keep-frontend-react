echo '############# S T A R T ################'
echo '########################################'
echo '########################################'
echo '##### Re-Run Flusso CI/CD Docs'
echo '########################################'
echo '####### B U I L D - S I T E ############'
echo '########################################'
yarn run build
echo '########################################'
echo '########################################'
echo '########################################'
echo '####### B U I L D - D O C K E R ########'
echo '########################################'
./build.sh
echo '########################################'
echo '########################################'
echo '########################################'
echo '####### R U N - D O C K E R ############'
./run.sh
echo '########################################'
echo '########################################'
echo '############# E N D ####################'
