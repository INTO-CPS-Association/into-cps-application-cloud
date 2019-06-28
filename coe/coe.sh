#!/bin/sh
# My first script
#DOCKER RUN-> chmod 755 coe
echo "Hello Coe!"
echo $(ls)
myIP=$(ifconfig eth0|grep 'inet '|awk '{print $2}'| tr -d '\r')
echo $myIP
myPATH='/data/'
cd $myPATH
coes='coes/'
mkdir -p $coes$myIP
cd $coes$myIP
$(java -jar ../../../coe.jar)