#random word link generator
import numpy
import sys


File_object = open(r"en","r")
w=numpy.loadtxt(File_object, dtype="object")
x=set(w)


def findnewword(word, list1):
    for n in range(0,len(word)):
        for m in alphabet:
            if word[0:n]+m+word[n+1:] in x and word[0:n]+m+word[n+1:] not in list1:
                return word[0:n]+m+word[n+1:]
            #change
            if word[0:n]+m+word[n:] in x and word[0:n]+m+word[n:] not in list1:
                return word[0:n]+m+word[n:]
            if word[0:n]+word[n+1:] in x and word[0:n]+word[n+1:] not in list1:
                #change
                if len(word[0:n]+word[n+1:])>=3:
                    return word[0:n]+word[n+1:]
    return None

def SequenceMatcher(word1,word2):
    tot=0
    #change
    for i in range (0,min(len(word1),len(word2))):
        if word1[i]==word2[i]:
            tot=tot+1
    return tot/min(len(word1),len(word2))

def diff(word1,word2):
    if len(word1) < len(word2):
        shortword=word1
        longword=word2
    else:
        shortword=word2
        longword=word1                            

    result=0
    if len(shortword)==len(longword):
        for i in range(0, len(longword)):
            if shortword[i]!=longword[i]:
                result=result+1
        return result
    else:
        i=0
        while i < len(shortword) and shortword[i]==longword[i]:
            i=i+1
        if i < len(shortword):
            result=1+diff(shortword[i:],longword[i+1:])
        else:
            result=1
        return result

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
    #change
    word=""
    while len(word)<4:
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
        diffs.append(SequenceMatcher(list1[0], list1[-1])+(10-len(list1))/10)
        
    if min(diffs)<0.5:
        minindex=diffs.index(min(diffs))
        break

startword=links[diffs.index(min(diffs))][0]
targetword=links[diffs.index(min(diffs))][-1]
links1=[]
for x in links:
    if targetword in x:
        links1.append(x[0:x.index(targetword)+1])
for x in range(0, len(links1)):
    for y in range(0, len(links1[x])-1):
        for z in range(y+2, len(links1[x])-1):
            if diff(links1[x][y],links1[x][z])==1:
                links1.append(links1[x][0:y+1]+links1[x][z:])
links1.sort(key=len)
links_out=links1[-1]
max_out=len(links1[-1])
min_out=len(links1[0])

