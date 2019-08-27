#!/usr/bin/expect
spawn ssh ${relay}
expect "*password:"
send "${passwd}\r"
expect "*ssl$"
send "ssh --matrix ${name}\r"
expect "*//"
send "cd ~/orp\r"
interact