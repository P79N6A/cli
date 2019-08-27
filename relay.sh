#!/usr/bin/expect
spawn ssh 1111
expect "*password:"
send "1111\r"
expect "*ssl$"
send "ssh --matrix 1111\r"
expect "*//"
send "cd ~/orp\r"
interact