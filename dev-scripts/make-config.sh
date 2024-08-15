awk '/^  apiKey/,/^  measure/ { sub(/:/,""); sub(/[^,]*/, "", $2); $0 = "  " $1 ": process.env.NEXT_PUBLIC_LAUNCH_" toupper($1) $2 }; { print }'
