




def diff(word1,word2):
    if len(word1)<len(word2):
        shortword=word1
        longword=word2
    else:
        shortword=word2
        longword=word1

    mismatch=0
    if len(longword)>len(shortword):
        i=0
        while shortword[i]==longword[i]:
            i=i+1
        if i==len(shortword)-1:
            mismatch=len(longword)-len(shortword)
        else:
            mismatch=1+diff(shortword[i:],longword[i+1:])

    else:
        for i in range(0, len(shortword)):
            if shortword[i]!=longword[i]:
                mismatch=mismatch+1
    return mismatch


