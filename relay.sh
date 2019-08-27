#!/usr/bin/expect
spawn ssh huangjian13@relay.baidu-int.com
expect "*password:"
send "1992922chuSHENG3\r"
expect "*ssl$"
send "ssh --matrix work@3891.huangjian13-otp-qmrmb.ksarch.cp01\r"
expect "*//"
send "cd ~/orp\r"
interact