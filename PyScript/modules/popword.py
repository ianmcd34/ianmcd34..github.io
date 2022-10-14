
import numpy

File_object = open(r"en","r")
w=numpy.loadtxt(File_object, dtype="object")
x=set(w)

print(x.pop())
