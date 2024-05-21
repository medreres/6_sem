# Pull the image
`docker pull pablooliveira/compil`

# Start up docker
`docker run -it -v "$(pwd)":/compil pablooliveira/compil /bin/bash`

# To compile file
`src/driver/dtiger -o test.o test.tig`
you will get `test.o`

# To line the code
`g++ -no-pie test.o src/runtime/posix/libruntime.a -o test.out`