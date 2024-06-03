# Pull the image
`docker pull pablooliveira/compil`

# Start up container
`docker run -it -v "$(pwd)":/compil pablooliveira/compil /bin/bash`

# To compile compiler
```
./configure
make
```

# To run compiler
`echo "a * b" | src/driver/dtiger --dump-ast -`