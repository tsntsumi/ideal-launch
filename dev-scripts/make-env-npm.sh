awk '/^  apiKey/,/^  measur/ { $1 = "NEXT_PUBLIC_LAUNCH_" toupper($1); sub(/: /,"="); sub(/,/, ""); print }'
