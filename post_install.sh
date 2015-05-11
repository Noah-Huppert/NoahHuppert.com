if [ "$RUN_PRE_INSTALL" = "true" ]
  then
    echo "Running post install"
    npm install bower
    ./node_modules/bower/bin/bower install
  else
    echo "Not running post install"
fi
