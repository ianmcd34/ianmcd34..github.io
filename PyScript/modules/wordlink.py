#random word link generator
import numpy
import sys
from difflib import SequenceMatcher

File_object = open(r"en","r")
w=numpy.loadtxt(File_object, dtype="object")
x=set(w)

def findnewword(word, list1):
    for n in range(0,len(word)):
        for m in alphabet:
            if word[0:n]+m+word[n+1:] in x and word[0:n]+m+word[n+1:] not in list1:
                return word[0:n]+m+word[n+1:]
    return None

# function to compare lists
def compare(l1, l2):
    # here l1 and l2 must be lists
    result=True
    for n in range(0, min(len(l1),len(l2))):
        if l1[n]!=l2[n]:
            result=False
    return result

while True:
    links=[]
    alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    word=x.pop()
    links.append([word])
    n=0
    m=0
    foundword=False
    while True:
        foundword=False

        list1=links[n]
        word=list1[m]
        if len(links)>20:
            break
        if len(list1)<8 and findnewword(word, list1) is not None:
            if word==list1[-1]:
                list1.append(findnewword(word, list1))  
                foundword=True
            else:
                list2=list1[0:m+1].copy()
                list2.append(findnewword(word, list1))
                notin=True
                for l in links:
                    if compare(l,list2):
                        notin=False
                if notin:
                    links.append(list2)
                    foundword=True
                elif n+1<len(links) or m+1<len(list1):
                    if m<len(list1):
                        m=m+1
                    else:
                        n=n+1
                elif not foundword:
                    break
        elif n+1<len(links) or m+1<len(list1):
            if m+1<len(list1):
                m=m+1
            else:
                m=0
                n=n+1
        elif not foundword:
            break

    diffs=[]
    for list1 in links:
        diffs.append(SequenceMatcher(a=list1[0], b=list1[-1]).ratio())
        
    if min(diffs)==0:
        break
print(links[diffs.index(min(diffs))])
