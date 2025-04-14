doit() {
    echo "About to do $*"
    sleep 0.1
    eval "$*"
    echo
    sleep 0.1
}
echo "replace ./cli with npm run cli or add execute permission to file with 'chmod +x ./cli.js ./cli ./cli.exe'"
echo
doit './cli '
doit './cli list '
echo LETS BACKUP YOUR EXISTING DATA
doit './cli export '
doit './cli import '
doit './cli import '
doit './cli delete "Listing made with"'
doit './cli add "Listing made with cli" "I find it useful. DERKA!" 50 10 '
doit './cli add "Listing made with enthusiasm" "I find it useful" 40 15 '
doit './cli add "Listing made with cli/cli.js tool" "I find it not useful" 35 20 '
doit './cli id junk "I find it"'
doit './cli del 67fc623380e849b042aa49eb    '
doit './cli add --debug  "Should Cause Error" "Ran outa time for full validation... allowed wrong Price" 12.3 100'
doit './cli find'
doit './cli find junk'
doit './cli findid junk'
doit './cli list '
doit './cli update '
doit './cli update 67f1d4083403edc9fe2f11c8 "Pile of Utter Junk" "Really nice junk. Unlike this description." 100 50  '
doit './cli list '
doit './cli delete  "Listing made with"      '
doit './cli delete  "Listing made with"      '
doit './cli delete  "Listing made with"      '
doit './cli delete  "Listing made with"      '
doit './cli delete  "Junk"      '
doit './cli list '
doit './cli delete     "Error"  '
doit './cli list '
doit "./cli del --all 67fc623380e849b042aa49eb      "
doit './cli import '
doit './cli list '
echo all going to plan your database was not hardmed.
