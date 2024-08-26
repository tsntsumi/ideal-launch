# ideal-launch
based on venefish

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

## OUTPUTS FOR ENV FILE
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

## OUTPUTS FOR CONFIG FILE

> apiKey: process.env.NEXT_PUBLIC_LAUNCH_APIKEY,
> authDomain: process.env.NEXT_PUBLIC_LAUNCH_AUTHDOMAIN,
> projectId: process.env.NEXT_PUBLIC_LAUNCH_PROJECTID,
> storageBucket: process.env.NEXT_PUBLIC_LAUNCH_STORAGEBUCKET,
> messagingSenderId: process.env.NEXT_PUBLIC_LAUNCH_MESSAGINGSENDERID,
> appId: process.env.NEXT_PUBLIC_LAUNCH_APPID,
> measurementId: process.env.NEXT_PUBLIC_LAUNCH_MEASUREMENTID

### TO GET CHANNEL DEPLOY URL

firebase hosting:channel:list | awk -F " *│ *" '$2 ~ /ideal-launch/ {print "export SITE_URL=" $4}'
export SITE_URL=https://ideal-launch--ideal-launch-4jikak4s.web.app

### TO CONVERT PNG TO FAVICON

convert -geometry 48x48 -background transparent favicon-256.png favicon.ico

## HOW TO INTEGRATE GOOGLE ANALYTICS TO FIREBASE

### 始める前に

FIREBASE にプロジェクトを追加し、Google Analytics が有効になっていることを確認する。

プロジェクトでGoogle Analyticsを有効にすると、Firebaseウェブアプリは、アプリ＋ウェブプロパティに関連付けられたGoogleアナリティクスのデータストリームにリンクされる。

### アプリにアナリティクスSDKを追加する

## INSTALL GOOGLE TAG MANAGER

1. Paste this code as high in the <head> of the page as possible:

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NSV9QVRR');</script>
<!-- End Google Tag Manager -->

2. Paste this code immediately after the opening <body> tag:

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NSV9QVRR"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

3. Test your website (optional):

