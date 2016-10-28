https://grapple.signin.aws.amazon.com/console

accounts+aws_mc@monitisecreate.com
gd$e5rtRHs&

ena-ci

ifconfig | grep "inet " | grep -v 127.0.0.1

but for configuring aws security group I need public ip (whats my ip)

ssh -i ~/Downloads/varkeys/grapple-aws-2.pem ec2-user@ec2-52-50-130-98.eu-west-1.compute.amazonaws.com

https://github.com/SIB-Colombia/dataportal-explorer/wiki/How-to-install-node-and-mongodb-on-Amazon-EC2

sudo npm install --global gulp

http://sanketdangi.com/post/62715793234/install-configure-jenkins-on-amazon-linux

Public DNS
ec2-52-50-130-98.eu-west-1.compute.amazonaws.com

Public IP
...

Jenkins 
http://ena.grppl.com:8080
elvin
lvnhmd21
stupidlittleshortcircuit@gmail.com

http://stackoverflow.com/questions/30576881/jenkins-build-when-a-change-is-pushed-to-github-option-is-not-working

http://theglassicon.com/computing/web-servers/install-nginx-amazon-linux-ami

wget http://nginx.org/download/nginx-1.10.1.tar.gz
tar xzf nginx-1.10.1.tar.gz

curl -Is http://localhost:8080 | head -1
curl -Is http://localhost:8081 | head -1

http://nginx.org/en/docs/beginners_guide.html

sudo /etc/init.d/nginx start
sudo /etc/init.d/nginx stop
sudo /etc/init.d/nginx reload

conf 
/usr/local/nginx/conf/

dist location
/var/lib/jenkins/workspace/ena/dist/

sudo npm install -g nodemon
nodemon /var/lib/jenkins/workspace/ena/server.js

more /home/ec2-user/log.txt
cd /var/lib/jenkins/workspace/ena
gulp nodemon > /home/ec2-user/log.txt &
tail -f /home/ec2-user/log.txt

ps -ef | grep node

http://blog.podrezo.com/init-d-startupshutdown-script-for-node-js-applications-via-forever/
/etc/init.d/forever start

http://unix.stackexchange.com/questions/4999/how-to-find-which-processes-are-taking-all-the-memory

ps -eo pmem,pcpu,vsize,pid,cmd | sort -k 1 -nr | head -5

ec2-user ALL = NOPASSWD: /etc/init.d/forever, /usr/local/bin/forever

Jenkins configuration:

Build step:

export PATH=/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/opt/aws/bin
npm install
gulp clean
gulp dist
gulp init-sources
sudo -u ec2-user /usr/local/bin/forever stopall
sudo -u ec2-user /usr/local/bin/forever start -d -p /var/run/forever -a server.js


Micro instance:
ssh -i ~/Downloads/varkeys/grapple-aws-2.pem ec2-user@ec2-52-50-130-98.eu-west-1.compute.amazonaws.com
