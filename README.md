# ideal-launch
based on stablo-free

## TO CONVERT FIREBASE CONFIG TO dot.env.local

awk '{ $1 = "NEXT_PUBLIC_LAUNCH_" toupper($1); sub(/: /,"="); sub(/,/, ""); print }' <<EOT
  apiKey: "XXXXXXXXX_XXXXXXXXXXX-XXXXXXXXXXXXsXXXX",
  authDomain: "xxxxxxxxxxxx.xxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxx.xxxxxxx.xxx",
  messagingSenderId: "999999999999",
  appId: "9:999999999999:xxx:xxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "X-XXXXXXXXXX"
EOT

Outputs for env file
> NEXT_PUBLIC_LAUNCH_APIKEY="XXXXXXXXX_XXXXXXXXXXX-XXXXXXXXXXXXsXXXX"
> NEXT_PUBLIC_LAUNCH_AUTHDOMAIN="xxxxxxxxxxxx.xxxxxxxxxxxxxxx"
> NEXT_PUBLIC_LAUNCH_PROJECTID="xxxxxxxxxxxx"
> NEXT_PUBLIC_LAUNCH_STORAGEBUCKET="xxxxxxxxxxxx.xxxxxxx.xxx"
> NEXT_PUBLIC_LAUNCH_MESSAGINGSENDERID="999999999999"
> NEXT_PUBLIC_LAUNCH_APPID="9:999999999999:xxx:xxxxxxxxxxxxxxxxxxxxxx"
> NEXT_PUBLIC_LAUNCH_MEASUREMENTID="X-XXXXXXXXXX"

## TO CONVERT FIREBASE CONFIG TO CONFIG

awk '{ sub(/:/,""); sub(/[^,]*/, "", $2); print $1 ": process.env.NEXT_PUBLIC_LAUNCH_" toupper($1) $2 }' <<EOT
  apiKey: "XXXXXXXXX_XXXXXXXXXXX-XXXXXXXXXXXXsXXXX",
  authDomain: "xxxxxxxxxxxx.xxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxx.xxxxxxx.xxx",
  messagingSenderId: "999999999999",
  appId: "9:999999999999:xxx:xxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "X-XXXXXXXXXX"
EOT

Outputs for config file
> apiKey: process.env.NEXT_PUBLIC_LAUNCH_APIKEY,
> authDomain: process.env.NEXT_PUBLIC_LAUNCH_AUTHDOMAIN,
> projectId: process.env.NEXT_PUBLIC_LAUNCH_PROJECTID,
> storageBucket: process.env.NEXT_PUBLIC_LAUNCH_STORAGEBUCKET,
> messagingSenderId: process.env.NEXT_PUBLIC_LAUNCH_MESSAGINGSENDERID,
> appId: process.env.NEXT_PUBLIC_LAUNCH_APPID,
> measurementId: process.env.NEXT_PUBLIC_LAUNCH_MEASUREMENTID

TO GET CHANNEL DEPLOY URL

firebase hosting:channel:list | awk -F " *│ *" '$2 ~ /ideal-launch/ {print "export SITE_URL=" $4}'
export SITE_URL=https://ideal-launch--ideal-launch-4jikak4s.web.app


TO CONVERT PNG TO FAVICON

convert -geometry 48x48 -background transparent favicon-256.png favicon.ico
