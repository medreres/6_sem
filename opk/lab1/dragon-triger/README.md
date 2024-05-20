# To compile file
Run
`src/driver/dtiger -o test.o test.tig`
you will get `test.o`

# To line the code
Run
`g++ -no-pie test.o src/runtime/posix/libruntime.a -o test.out`