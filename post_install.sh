if [ "$RUN_PRE_INSTALL" = "true" ]
  then
    echo "Running pre install"
    npm install bower
    ./node_modules/bower/bin/bower install
  else
    echo "Not running pre install"
fi
