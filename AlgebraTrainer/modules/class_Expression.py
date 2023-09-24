


import numpy as np
import math
import re


class Expression:
    def __init__(self):
        self.elements=np.array([[0, None,None,None]])

    def add_branch(self,operator, operand):
        maxindex=self.elements[:,0].max()
        minindex=self.elements[:,0].min()
        if operator in ('+','*'):
            if maxindex==0 and self.elements[0][1] is None:
                self.elements[0][1]=operand
            else:
                newelements=np.array([[maxindex+2, operator, maxindex, maxindex+1],[maxindex+1, operand, None, None]])
                oldelements=self.elements
                self.elements=np.concatenate((oldelements,newelements), axis=0)
        elif operator=='-':
            if operand.isdigit():
                if maxindex==0 and self.elements[0][1] is None:
                    self.elements[0][1]=str((-1)*int(operand))
                else:
                    newelements=np.array([[maxindex+2, '+', maxindex, maxindex+1],[maxindex+1, str((-1)*int(operand)), None, None]])
                    oldelements=self.elements
                    self.elements=np.concatenate((oldelements,newelements), axis=0)
            else:
                if maxindex==0 and self.elements[0][1] is None:
                    self.elements[0][1]='-1'
                    newelements=np.array([[maxindex+2, '*', maxindex, maxindex+1],[maxindex+1, operand, None, None]])
                    oldelements=self.elements
                    self.elements=np.concatenate((oldelements,newelements), axis=0)
                else:
                    newelements=np.array([[maxindex+2, '+', maxindex, maxindex+1],[maxindex+1, '*', minindex-1, minindex-2]
                                         ,[minindex-1,'-1',None,None],[minindex-2,operand,None,None]])
                    oldelements=self.elements
                    self.elements=np.concatenate((oldelements,newelements), axis=0)
        elif operator=='/':
            if maxindex==0 and self.elements[0][1] is None:
                return False
            else:
                newelements=np.array([[maxindex+3, '*', maxindex, maxindex+2],[maxindex+2, '/', maxindex+1, maxindex+1]
                                     ,[maxindex+1, operand, None, None]])
                oldelements=self.elements
                self.elements=np.concatenate((oldelements,newelements), axis=0)
                

        
    def add_subbranch(self,index,operator,operand):
        index=np.where(self.elements[:,0]==index)[0][0]
        el=self.elements[index].copy()
        if self.elements[index][1] not in ('+','-','*','/'):
            minindex=self.elements[:,0].min()
            if operator in ('*','+'):
                self.elements[index][1]=operator
                self.elements[index][2]=minindex-1
                self.elements[index][3]=minindex-2
                newelements=np.array([[minindex-1, el[1], None, None],[minindex-2, operand, None, None]])
                oldelements=self.elements
                self.elements=np.concatenate((oldelements,newelements), axis=0)
            elif operator=='-':
                self.elements[index][1]='+'
                self.elements[index][2]=minindex-1
                self.elements[index][3]=minindex-2
                newelements=np.array([[minindex-1, el[1], None, None],[minindex-2, '*', minindex-3, minindex-4],
                                      [minindex-3, '-1', None, None],[minindex-4, operand, None, None]])
                oldelements=self.elements
                self.elements=np.concatenate((oldelements,newelements), axis=0)
            elif operator=='/':
                self.elements[index][1]='*'
                self.elements[index][2]=minindex-1
                self.elements[index][3]=minindex-2
                newelements=np.array([[minindex-1, el[1], None, None],[minindex-2, '/', minindex-3, minindex-3],
                                      [minindex-3, operand, None, None]])
                oldelements=self.elements
                self.elements=np.concatenate((oldelements,newelements), axis=0)

    #new is a string in the format '<op1><const1><*><vars><op2><const2><*><vars>'
    def change_expression(self, new):
        newexp=Expression()
        joinoperator=new[0]
        if joinoperator not in ('+','*','/'):
            print("ERROR: must be joined by +/*//")
            return False
        
    
    
            
    def find_pointer(self, index):
        for i in range(0, len(self.elements)):
            if self.elements[i,0]==index:
                return i
            
                
    
        
    def find_depth(self,index):
        result=self.print_tree('r')
        bracketcount=0
        for i in range(0,len(result)):
            if result[i:i+2]=='(!' or result[i]=='{':
                bracketcount=bracketcount+1
            if result[i:i+2]=='!)' or result[i]=='}':
                bracketcount=bracketcount-1
            if result[i]=='[' and int(result[i+1:result[i:].find(']')+i])==index:
                return bracketcount  
        return -1
    
    def find_divide(self,index):
        divideindex=None
        print(self.find_pointer(index))
        leftindex=self.elements[self.find_pointer(index),2]
        rightindex=self.elements[self.find_pointer(index),3]
        if leftindex==None:
            return divideindex
        if self.elements[self.find_pointer(leftindex),1]=='/':
            return self.elements[self.find_pointer(leftindex),0]
        elif self.elements[self.find_pointer(rightindex),1]=='/':
            return self.elements[self.find_pointer(rightindex),0]
        else:
            self.find_divide(self.elements[self.find_pointer(leftindex),0])
            self.find_divide(self.elements[self.find_pointer(rightindex),0])


    def fractionise(self, txt):
        txt="("+txt+")"
        print(txt)
        x = re.search("\([^\(]*?\)", txt)
        dict={}
        pointer=0
        keylist='ABCDEFGHIJ'

        while x:

            print(x.group())
            group=x.group()
            
            txt=txt.replace(x.group(), keylist[0] )

            if txt.find("*(1/"+keylist[0]+")")>-1:
                txt=txt.replace("*(1/"+keylist[0]+")", "/"+keylist[0])
            if len(group)==3 and group[1].islower():
                group=group[1]
            
            
            dict[keylist[0]]=group
            keylist=keylist[1:]

            print(txt)

        
            x = re.search("\([^\(]*?\)", txt)


        print(dict)

        for x1, y1 in dict.items():
            if y1.find("/")>-1:
                y1=y1[0:y1.find("/")-1]+"\\frac{"+y1[y1.find("/")-1:y1.find("/")+2]+"}"+y1[y1.find("/")+2:]
                y1=y1.replace("/","}{")
                dict[x1]=y1

        finish=False

        while not finish:
            replace=False
            for x1 in txt:
                if x1 in dict.keys():
                    txt=txt.replace(x1, dict[x1])
                    replace=True
            if not replace:
                finish=True

        if txt[0]=="(" and txt[-1]==")":
            txt=txt[1:len(txt)-1]
            

        return txt


    def print_tree(self,o_r, *selectedNodes):
        firstrednode=None
        lastrednode=None
        
        maxindex=self.elements[:,0].max()
        absmaxindex=np.where(self.elements[:,0]==maxindex)[0][0]
        result=""
        if self.elements[absmaxindex][2] is not None:
            left=self.print_leftsubtree(self.elements[absmaxindex][2])
            right=self.print_rightsubtree(self.elements[absmaxindex][3])
            if self.elements[absmaxindex][1]=='+':
                if left.startswith("(!") and left.endswith("!)"):
                    left=left[2:-2]
                if right.startswith("(!") and right.endswith("!)"):
                    right=right[2:-2]
            result="("+left+"["+str(maxindex)+"]"+self.elements[absmaxindex][1]+right+")"
        else:
            result="("+"["+str(maxindex)+"]"+self.elements[absmaxindex][1]+")"

        if selectedNodes and len(selectedNodes[0].strip())>13 and selectedNodes[0].startswith("selectedNodes"):
            print(selectedNodes[0])
            x = re.findall("\[-?\d+\]", result)
            y = [z[1:-1] for z in x]

            selectedNodesList=selectedNodes[0][14:].split(",")

            for i in y:
                if i in selectedNodesList:
                    lastrednode=int(i)
                    if firstrednode is None:
                        firstrednode=int(i)
            
            print(firstrednode,lastrednode)
            
            a=result.index("["+str(firstrednode)+"]")
            searchtxt="\["+str(lastrednode)+"\]-?\w+|\["+str(lastrednode)+"\]\+|\["+str(lastrednode)+"\]\*"
            b=re.search(searchtxt, result)
            print(b)
            print("depths="+str(self.find_depth(firstrednode))+","+str(self.find_depth(lastrednode)))
            depth1=self.find_depth(firstrednode)
            depth2=self.find_depth(lastrednode)
            ddepth=abs(depth2-depth1)*2
            result1=result
            if self.find_depth(firstrednode)>self.find_depth(lastrednode):
                print("depth1>depth2")
                a=result[0:a].rindex('(!')
                result1=result[0:a]+"(!R"+result[a:b.span()[1]]+"S!)"+result[b.span()[1]:]
            if self.find_depth(firstrednode)<self.find_depth(lastrednode):
                print("depth1<depth2",result[0:a]+"R"+result[a:b.span()[1]]+result[b.span()[1]:b.span()[1]+result[b.span()[1]:].index('!)')+ddepth],result[b.span()[1]+result[b.span()[1]:].index('!)')+ddepth:])           
                result1=result[0:a]+"(!R"+result[a:b.span()[1]]+result[b.span()[1]:b.span()[1]+result[b.span()[1]:].index('!)')+ddepth]+"S!)"+result[b.span()[1]+result[b.span()[1]:].index('!)')+ddepth:]
            else:
                result1=result[0:a]+"(!R"+result[a:b.span()[1]]+"S!)"+result[b.span()[1]:]

            result=result1

        output=result.replace("(!", "{")
        output=output.replace("!)","}")
        output=output.replace("(","")
        output=output.replace(")","")
        output=output.replace("{","(")
        output=output.replace("}",")")
        while output.find("[") != -1:
            output=output.partition("[")[0]+output.partition("]")[2]

            primed=False
            i=0
        while i<len(output):
            if output[i]=='-':
                output=output[0:i]+"("+output[i:]
                primed=True
                i=i+1
            elif (not output[i].isdigit()) and primed:
                output=output[0:i]+")"+output[i:]
                primed=False
                i=i+1
            i=i+1
        if primed:
            output=output+")"
            
            
        
        final=''
        var=''
        power=0
        for i in range(0,len(output)):
            if output[i].islower():
                if var=='':
                    var=output[i]
                    power=1
                    final=final+output[i]
                elif var==output[i]:
                    power=power+1
                else:
                    if power>1:
                        final=final+"^"+str(power)
                    var=output[i]
                    power=1
                    final=final+"*"+output[i]
            elif (output[i].isdigit() or output[i]=='(') and var!='':
                if power>1:
                    final=final+"^"+str(power)
                var=''
                power=0
                final=final+"*"+output[i]
            elif output[i]=="*":
                if var=='':
                    final=final+output[i]
            else:
                if power>1:
                    final=final+"^"+str(power)
                var=''
                power=0
                final=final+output[i]
        if power>1:
            final=final+"^"+str(power)
        #check for +(-X)
        p=re.search(r"\+\(-[^()]*\)", final)
        while p:
            q=re.search(r"\+\(-1\)\*", final)
            if q:
                final=final[:q.span()[0]]+"-"+final[q.span()[1]:]
            else:
                final=final[:p.span()[0]]+final[p.span()[0]+2:p.span()[1]-1]+final[p.span()[1]:]
            p=re.search(r"\+\(-[^()]*\)", final)
        #check for (-1)*nx
        p=re.search(r"\(-1\)\*[0-9a-z]+", final)
        while p:
            q=re.search(r"\(-1\)\*[0-9]+", final)
            if q:
                final=final[:q.span()[0]]+"(-"+final[q.span()[0]+5:q.span()[1]]+")"+final[q.span()[1]:]
            else:
                q=re.search(r"\(-1\)\*[a-z]{1}[^\^]", final)
           
                if q:
                    final=final[:q.span()[0]]+"(-"+final[q.span()[0]+5:q.span()[0]+6]+")"+final[q.span()[0]+6:]
                else:
                    p=None
            if p:
                p=re.search(r"\(-1\)\*[0-9a-z]+", final)
            
            
        dividepos=final.find('/')
        if dividepos>=0:
            final1=self.fractionise(final)
        else:
            final1=final

        latex=''
        powered=0

        for i in range(0,len(final1)):
            if final1[i]=='(':
                if final1[i+1]!='R':
                    latex+='\\left('
            elif final1[i]==')':
                if final1[i-1]!='S':
                    latex+='\\right)'
            elif final1[i]=='R':
                latex+='\\textcolor{red}{'
            elif final1[i]=='S':
                latex+='}'
            elif final1[i]=='^':
                latex+='^{'
                powered+=1
            elif not final1[i].isdigit() and powered>0:
                powered-=1
                latex+='}'+final1[i]
            else:
                latex+=final1[i]
        if powered>0:
            for i in range(0,powered):
                latex+='}'


                
        output.replace("R","")
        output.replace("S","")
        result.replace("R","")
        result.replace("S","")
        final.replace("R","")
        final.replace("S","")
            
        if o_r=='o':
            print(output)
            return output
        elif o_r=='r':
            print(result)
            return result
        elif o_r=='f':
            print(final)
            return final
        elif o_r=='l':
            print(latex)
            return latex
            
 

    def print_leftsubtree(self,index):
        absindex=np.where(self.elements[:,0]==index)[0][0]
        if self.elements[absindex][2] is not None:
            left=self.print_leftsubtree(self.elements[absindex][2])
            right=self.print_rightsubtree(self.elements[absindex][3])
            if self.elements[absindex][1]=='+' or self.elements[absindex][1]=='-':
                if left.startswith("(!") and left.endswith("!)"):
                    left=left[2:-2]
                if right.startswith("(!") and right.endswith("!)"):
                    right=right[2:-2]
                return "(!"+left+"["+str(index)+"]"+self.elements[absindex][1]+right+"!)"
            elif self.elements[absindex][1]=='/':
                if not (right.startswith("(!") and right.endswith("!)")):
                    right="(!"+right+"!)"
                return "{"+"(1"+"["+str(index)+"]"+self.elements[absindex][1]+right+"}"
            else:
                return "("+left+"["+str(index)+"]"+self.elements[absindex][1]+right+")"
        else:
            return "("+"["+str(index)+"]"+self.elements[absindex][1]

        
    def print_rightsubtree(self,index):
        absindex=np.where(self.elements[:,0]==index)[0][0]
        if self.elements[absindex][2] is not None:
            left=self.print_leftsubtree(self.elements[absindex][2])
            right=self.print_rightsubtree(self.elements[absindex][3])
            if self.elements[absindex][1]=='+' or self.elements[absindex][1]=='-':
                if left.startswith("(!") and left.endswith("!)"):
                    left=left[2:-2]
                if right.startswith("(!") and right.endswith("!)"):
                    right=right[2:-2]
                return "(!"+left+"["+str(index)+"]"+self.elements[absindex][1]+right+"!)"
            elif self.elements[absindex][1]=='/':  
                if not (right.startswith("(!") and right.endswith("!)")):
                    right="(!"+right+"!)"
                return "{"+"(1"+"["+str(index)+"]"+self.elements[absindex][1]+right+"}"
            else:
                return "("+left+"["+str(index)+"]"+self.elements[absindex][1]+right+")"
        else:
            return "["+str(index)+"]"+self.elements[absindex][1]+")"
            
     
    
   
    def translate(self, with_indices=False):
        
        def translate_brackets(op):
            state=''
            translation=[""]
            bracketcount=0
            for i in range(len(op)):
                x=op[i:i+2]
                if x=='(!' and state!='openindex' and state!='openbrackets':
                    state='openbrackets'
                    bracketcount=bracketcount+1
                    translation[0]=translation[0]+"brackets"
                    translation.append(translate_brackets(op[i+1:len(op)]))
                elif x=='(!' and state!='openindex' and state=='openbrackets':
                    bracketcount=bracketcount+1
                    translation[0]=translation[0]+str(bracketcount)
                elif x[0]=='{' and state!='openindex' and state!='openbrackets':
                    bracketcount=bracketcount+1
                    state='openbrackets'
                    translation[0]=translation[0].rstrip("*")+"/divisor"
                    translation.append(translate_brackets(op[i+1:len(op)]))
                elif x=='{' and state!='openindex' and state=='openbrackets':
                    bracketcount=bracketcount+1
                    translation[0]=translation[0]+str(bracketcount)
                elif x[0]=='[' and state!='openindex' and state!='openbrackets':
                    state='openindex'
                    if with_indices:
                        translation[0]=translation[0]+"["
                elif x=='!)' and state=='openbrackets':
                    bracketcount=bracketcount-1
                    if bracketcount==0:
                        state='closebrackets'
                elif x=='!)' and state!='openbrackets':
                    break
                elif x[0]=='}' and state=='openbrackets':
                    bracketcount=bracketcount-1
                    if bracketcount==0:
                        state='closebrackets'
                elif x[0]=='}' and state!='openbrackets':
                    break
                elif x[0]==']' and state=='openindex':
                    state='closeindex'
                    if with_indices:
                        translation[0]=translation[0]+"]"
                elif x[0].isdigit() and state!='digit' and state!='openindex' and state!='openbrackets':
                    state='digit'
                    translation[0]=translation[0]+"constant"
                elif x[0] in ('+','*') and state!='openindex' and state!='openbrackets':
                    state='operator'
                    translation[0]=translation[0]+x[0]
                elif x[0] in ('/') and state!='openindex' and state!='openbrackets':
                    state='operator'
                    translation[0]=translation[0].rstrip("constant")+x[0]
                elif x[0].islower() and state!='openindex' and state!='openbrackets':
                    state='variable'
                    translation[0]=translation[0]+x[0]
                elif (x[0].isdigit() or x[0]=='-') and state=='openindex' and with_indices:
                    translation[0]=translation[0]+x[0]
            return translation   


        result=self.print_tree('r')
        output=self.print_tree('o')
        state=''
        translation=[""]
        bracketcount=0
        for i in range(len(result)):
            x=result[i:i+2]
            if x=='(!' and state!='openindex' and state!='openbrackets':
                translation[0]=translation[0]+"brackets"
                translation.append(translate_brackets(result[i+1:len(result)]))
                bracketcount=bracketcount+1
                state='openbrackets'
            elif x=='(!' and state!='openindex' and state=='openbrackets':
                bracketcount=bracketcount+1
                translation[0]=translation[0]+str(bracketcount)
            elif x[0]=='{' and state!='openindex' and state!='openbrackets':
                translation[0]=translation[0].rstrip("*")+"/divisor"
                translation.append(translate_brackets(result[i+1:len(result)]))
                bracketcount=bracketcount+1
                state='openbrackets'
            elif x[0]=='{' and state!='openindex' and state=='openbrackets':
                bracketcount=bracketcount+1
                translation[0]=translation[0]
            elif x[0]=='[' and state!='openindex' and state!='openbrackets':
                state='openindex'
                if with_indices:
                    translation[0]=translation[0]+"["
            elif x=='!)' and state=='openbrackets':
                bracketcount=bracketcount-1
                if bracketcount==0:
                    state='closebrackets'
            elif x=='!)' and state!='openbrackets':
                translation[0]=translation[0]+"ERROR wrong brackets"
                translation[0]=translation[0]+str(bracketcount)
                break
            elif x[0]=='}' and state=='openbrackets':
                bracketcount=bracketcount-1
                if bracketcount==0:
                    state='closebrackets'
            elif x[0]=='}' and state!='openbrackets':
                translation[0]=translation[0]+"ERROR wrong brackets"
                translation[0]=translation[0]+str(bracketcount)
                break
            elif x[0]==']' and state=='openindex':
                state='closeindex'
                if with_indices:
                    translation[0]=translation[0]+"]"
            elif x[0].isdigit() and state!='digit' and state!='openindex' and state!='openbrackets':
                state='digit'
                translation[0]=translation[0]+"constant"
            elif x[0] in ('+','*') and state!='openindex' and state!='openbrackets':
                state='operator'
                translation[0]=translation[0]+x[0]
            elif x[0] in ('/') and state!='openindex' and state!='openbrackets':
                state='operator'
                translation[0]=translation[0].rstrip("constant")+x[0]
            elif x[0].islower() and state!='openindex' and state!='openbrackets':
                state='variable'
                translation[0]=translation[0]+x[0]
            elif (x[0].isdigit() or x[0]=='-') and state=='openindex' and with_indices:
                translation[0]=translation[0]+x[0]
        return translation

    
    def translate_flat(self):
        def flatten(l1,depth):
            
            if len(l1)==1:
                if type(l1[0])==str:
                    result='<'+str(depth)+'>'+l1[0]
                    depth=depth-1
                else:
                    depth=depth+1
                    result=flatten(l1[0],depth)
            elif type(l1[0])==str:
                result='<'+str(depth)+'>'+l1[0]+","+flatten(l1[1:],depth)
            else:
                depth=depth+1
                result=flatten(l1[0],depth)+","+flatten(l1[1:],depth-1)

            return result
   
        translation1=flatten(self.translate(),0).split(",")
        translation=[]
        for e in translation1:
            depth=e[0:3]
            e=e[3:]
            for i in range(0,len(e.split("+"))):
                if i>0:
                    ee="+"+e.split("+")[i]
                else:
                    ee=e.split("+")[i]
                for j in range(0,len(ee.split("-"))):
                    if j>0:
                        translation.append(depth+"-"+ee.split("-")[j])
                    else:
                        translation.append(depth+ee.split("-")[j])
                        
        return translation
        
            
                
    def simplify(self):
       
        translation=self.translate_flat()
   
        print(translation)
        simplify=''
        depth=''
        maxdepth=0
        multiply_constant=False
        add_constant=False
        cancel_constant=False
        cancel_variable=False
        cancel_bracket=False
        add_variable=False
        expand_brackets=False
        letters=[]
        
        def find_parent(index):
            for e in self.elements:
                if e[2]==index or e[3]==index:
                    return e[0]
            return 999
        
        def deindex(result):
            output=result.replace("(!", "{")
            output=output.replace("!)","}")
            output=output.replace("(","")
            output=output.replace(")","")
            output=output.replace("{","(")
            output=output.replace("}",")")
            while output.find("[") != -1:
                output=output.partition("[")[0]+output.partition("]")[2]

                primed=False
                i=0
            while i<len(output):
                if output[i]=='-':
                    output=output[0:i]+"("+output[i:]
                    primed=True
                    i=i+1
                elif (not output[i].isdigit()) and primed:
                    output=output[0:i]+")"+output[i:]
                    primed=False
                    i=i+1
                i=i+1
            if primed:
                output=output+")"
            return output

        for i in range(0 , len(translation)):
            e=translation[i]
            depth=int(e[1:e.find(">")])
            if depth>maxdepth:
                maxdepth=depth
        for j in range(0, maxdepth+1):
            found_add_constant=False
            expand_brackets=False
            for i in range(0 , len(translation)):
                e=translation[i]
                depth=int(e[1:e.find(">")])
                print (depth,j)
                if depth==j:
                    print("find if add constants")
                    if found_add_constant==True:
                        if e[3:]=="+constant" or e[3:]=="constant":
                            add_constant=True
                    elif e[3:]=="+constant" or e[3:]=="constant":
                         found_add_constant=True
                    print(found_add_constant)
                    print("find if expand brackets")
                    if e.find("brackets*")>-1 or e.find("*brackets")>-1 :
                        expand_brackets=True
         
                    e1=e[e.find(">")+1:].replace("constant","")
                    if len(e1)==1:
                        e1='+'+e1

                    letters_j=[str(j)]
                    if e1.find("brackets")==-1 and e1.find("divisor")==-1:
                        for k in range(0,len(e1)):
                            print(e1[k])
                            if e1[k].islower():
                                letters_j.append(e1[k])
                                print(e1[k])

                        print(letters_j)
                        letters.append(letters_j)
                        print(letters)
 
                    while len(e)>1:
                        print("find if multiply constants")
                        multiply_constant=False
                        found_constant_times=e.find("constant")
                        found_times_constant=e.rfind("constant")
                        found_add=e.find("+")
                        found_minus=e.find("-")
                        print(found_constant_times,found_times_constant,found_add,found_minus)

                        if found_constant_times>-1 and found_times_constant>found_constant_times:
                            if found_add in range(found_times_constant,found_constant_times):
                                e=e[found_add+1:len(e)]
                            elif found_minus in range(found_times_constant,found_constant_times):
                                e=e[found_minus+1:len(e)]
                            else:
                                multiply_constant=True
                                e=e[0]
                        else:
                            e=e[0]

                    if multiply_constant:
                        simplify=simplify+translation[i][0:translation[i].find(">")+1]+'multiply constants'
                    if add_constant:
                        simplify=simplify+translation[i][0:translation[i].find(">")+1]+'add constants'
                    if expand_brackets:
                        simplify=simplify+translation[i][0:translation[i].find(">")+1]+'expand brackets'
        #find if add expressions
         
        for i in range(0,len(letters)-1):
            print("find if add expressions")
            for j in range(i+1,len(letters)):
                letters[i].sort()
                letters[j].sort()
                print(letters)
                print(letters[i],letters[j], letters[i]==letters[j])
                if letters[i]==letters[j] and len(letters[i])>1:
                    simplify=simplify+"<"+letters[i][0]+">"+'add expressions'
            

        #search for any division operator
        for i in range(0, len(self.elements)):
            numerator=0
            numeratorvar=''
            denominator=0
            denominatorvar=''
            divideindex=None
            parentindex=None
            if self.elements[i,1][-1].isdigit():
                numerator=int(self.elements[i,1])
                numeratorindex=self.elements[i,0]
                p=find_parent(self.elements[i,0])
                while p!=999 and self.elements[self.find_pointer(p),1]=='*' and divideindex is None:
                    divideindex=self.find_divide(p)
                    print(numerator,divideindex)
                    p=find_parent(self.elements[self.find_pointer(p),0])
                    
            elif self.elements[i,1].islower():
                numeratorvar=self.elements[i,1]
                numeratorindex=self.elements[i,0]
                p=find_parent(self.elements[i,0])
                while p!=999 and self.elements[self.find_pointer(p),1]=='*' and divideindex is None:
                    divideindex=self.find_divide(p)
                    print(numeratorvar,numeratorindex,divideindex)
                    p=find_parent(self.elements[self.find_pointer(p),0])
                    
            if divideindex is not None:
                parentindex=divideindex
                
            print(numeratorvar,parentindex,"*"+denominatorvar+"*")
            print(numerator,parentindex,denominatorvar)
      
            #check if you can cancel constants
            print("find if cancel constants")
            while numerator!=0 and parentindex is not None and denominator==0:
                leftindex=self.elements[self.find_pointer(parentindex),2]
                rightindex=self.elements[self.find_pointer(parentindex),3]

                if self.elements[self.find_pointer(leftindex),1][-1].isdigit() and math.gcd(int(math.fabs(numerator)),int(math.fabs(int(self.elements[self.find_pointer(leftindex),1]))))>1:
                    denominator=int(self.elements[self.find_pointer(leftindex),1])  
                    denominatorindex=self.elements[self.find_pointer(leftindex),0]
                elif self.elements[self.find_pointer(rightindex),1][-1].isdigit() and math.gcd(int(math.fabs(numerator)),int(math.fabs(int(self.elements[self.find_pointer(rightindex),1]))))>1:
                    denominator=int(self.elements[self.find_pointer(rightindex),1])  
                    denominatorindex=self.elements[self.find_pointer(rightindex),0]
                else:
                    if self.elements[self.find_pointer(leftindex),1] =='*':
                        parentindex=leftindex
                    else:
                        if self.elements[self.find_pointer(rightindex),1] =='*':
                            parentindex=rightindex
                        else:
                            p=find_parent(parentindex)
                            while p!=divideindex and p!=999:
                                if self.elements[self.find_pointer(p),2]==parentindex:
                                    parentindex=self.elements[self.find_pointer(p),3]
                                else:
                                    parentindex=p
                                    p=find_parent(parentindex)
                            if denominator==0:
                                parentindex=None

                print(type(numerator),type(denominator))
                if denominator!=0 and math.gcd(int(math.fabs(numerator)),int(math.fabs(denominator)))>1:
                    print("cancel "+str(numerator)+"/"+str(denominator))
                    cancel_constant=True
                    simplify=simplify+"["+str(numeratorindex)+"]["+str(denominatorindex)+"]cancel constants"
                    
            if divideindex is not None:
                parentindex=divideindex
                   
            #check if you can cancel variables
            print("find if cancel variables")
            while numeratorvar!='' and parentindex is not None and denominatorvar=='':
                leftindex=self.elements[self.find_pointer(parentindex),2]
                rightindex=self.elements[self.find_pointer(parentindex),3]
                print(leftindex,rightindex)
                if self.elements[self.find_pointer(leftindex),1].islower() and self.elements[self.find_pointer(leftindex),1]==numeratorvar:
                    denominatorvar=self.elements[self.find_pointer(leftindex),1]  
                    denominatorindex=self.elements[self.find_pointer(leftindex),0]
                    print(denominatorvar,denominatorindex)
                elif self.elements[self.find_pointer(rightindex),1].islower() and self.elements[self.find_pointer(rightindex),1]==numeratorvar:
                    denominatorvar=self.elements[self.find_pointer(rightindex),1]  
                    denominatorindex=self.elements[self.find_pointer(rightindex),0]
                
                else:
                    if self.elements[self.find_pointer(leftindex),1] =='*':
                        parentindex=leftindex
                    else:
                        if self.elements[self.find_pointer(rightindex),1] =='*':
                            parentindex=rightindex
                        else:
                            p=find_parent(parentindex)
                            while p!=divideindex and p!=999:
                                if self.elements[self.find_pointer(p),2]==parentindex:
                                    parentindex=self.elements[self.find_pointer(p),3]
                                else:
                                    parentindex=p
                                    p=find_parent(parentindex)
                            if denominatorvar=='':
                                parentindex=None
                                
                print(type(numeratorvar),type(denominatorvar))
                if denominatorvar!='' and numeratorvar==denominatorvar:
                    print("cancel "+numeratorvar+"/"+denominatorvar)
                    cancel_variable=True
                    simplify=simplify+"["+str(numeratorindex)+"]["+str(denominatorindex)+"]cancel variables"
         
        #search for any division operator
        for i in range(0, len(self.elements)):
            if self.elements[i,1]=='/':
                #find numerator brackets
                numeratorplusnodes=[]
                p=find_parent(self.elements[i,0])
                pnodes=[]
                while p!=999 and self.elements[self.find_pointer(p), 1]=='*':
                    pnodes.append(p)
                    leftnode=self.elements[self.find_pointer(p), 2]
                    rightnode=self.elements[self.find_pointer(p), 3]
                    p=find_parent(p)
                    if leftnode is not None:
                        if self.elements[self.find_pointer(leftnode),1]=='+':
                            numeratorplusnodes.append(self.elements[self.find_pointer(leftnode), 0])
                        elif self.elements[self.find_pointer(leftnode),1]=='*' and leftnode not in pnodes:
                            p=leftnode
                        elif rightnode is not None:
                            if self.elements[self.find_pointer(rightnode),1]=='+':
                                numeratorplusnodes.append(self.elements[self.find_pointer(rightnode), 0])
                            elif self.elements[self.find_pointer(rightnode),1]=='*' and rightnode not in pnodes:
                                p=rightnode
                                

                #find denominator brackets
                denominatorplusnodes=[]
                p=self.elements[i,2] 
                pnodes=[]
                while p!=self.elements[i,0] and self.elements[self.find_pointer(p), 1]=='*':
                    pnodes.append(p)
                    leftnode=self.elements[self.find_pointer(p), 2] 
                    rightnode=self.elements[self.find_pointer(p), 3] 
                    if leftnode is not None:
                        if self.elements[self.find_pointer(leftnode),1]=='+' and leftnode not in pnodes:
                            denominatorplusnodes.append(self.elements[self.find_pointer(leftnode), 0])
                            pnodes.append(leftnode)
                            p=find_parent(p)
                        elif self.elements[self.find_pointer(leftnode),1]=='*' and leftnode not in pnodes:
                            p=leftnode 
                        elif rightnode is not None:
                            if self.elements[self.find_pointer(rightnode),1]=='+' and rightnode not in pnodes:
                                denominatorplusnodes.append(self.elements[self.find_pointer(rightnode), 0]) 
                                pnodes.append(rightnode)
                                p=find_parent(p) 
                            elif self.elements[self.find_pointer(rightnode),1]=='*' and rightnode not in pnodes:
                                p=rightnode
                            else:
                                p=find_parent(p)
                        else:
                            p=find_parent(p) 
                if p==self.elements[i,2] and self.elements[self.find_pointer(p), 1]=='+':
                    denominatorplusnodes.append(self.elements[self.find_pointer(p), 0])

                    
                print("numeratorplusnodes",numeratorplusnodes, denominatorplusnodes)    
                for n in numeratorplusnodes:
                    print(deindex(self.print_leftsubtree(n)))
                    for m in denominatorplusnodes:
                        print(deindex(self.print_leftsubtree(m)))
                        if deindex(self.print_leftsubtree(n))==deindex(self.print_leftsubtree(m)):
                            cancel_brackets=True
                            simplify=simplify+"["+str(n)+"]["+str(m)+"]cancel brackets"
                    
            
        return simplify
        
        
    def multiply_constants(self):
        
        def find_parent(index):
            for e in self.elements:
                print(e,index)
                if e[2]==index or e[3]==index:
                    return e[0]
            return 999
        
        for e in self.elements:
            print("multiply consts  e="+e)
            commonparentindex=None
            if e[1][-1].isdigit():
                print("multiply consts digit found")
                for e1 in self.elements:
                    print("multiply consts  e1="+e1)
                    constantindex=None
                    constantindex1=None
                    commonparentindex=None
                    if e[0]!=e1[0] and e1[1][-1].isdigit():
                        pt=[e[0]]
                        pt1=[e1[0]]
                        while find_parent(pt[-1])!=999 and self.elements[self.find_pointer(find_parent(pt[-1])),1]=="*":
                            pt.append(self.elements[self.find_pointer(find_parent(pt[-1])),0])
                        while find_parent(pt1[-1])!=999 and self.elements[self.find_pointer(find_parent(pt1[-1])),1]=="*":
                            pt1.append(self.elements[self.find_pointer(find_parent(pt1[-1])),0])
                        for p in pt:
                            for p1 in pt1:
                                print(p,p1,p==p1)
                                if p==p1:
                                    constantindex=pt[0]
                                    constantindex1=pt1[0]
                                    commonparentindex=p
                                    break
                            if commonparentindex is not None:
                                break
                        if commonparentindex is not None:
                            break
                    if commonparentindex is not None:
                        break
                if commonparentindex is not None:
                    break

                            
        if constantindex is not None and constantindex1 is not None:
            multiplicand=int(self.elements[self.find_pointer(constantindex),1])
            multiplicand1=int(self.elements[self.find_pointer(constantindex1),1])
            
            if commonparentindex==find_parent(constantindex) and commonparentindex==find_parent(constantindex1):     
                self.elements[self.find_pointer(commonparentindex),1]=str(multiplicand*multiplicand1)
                self.elements[self.find_pointer(commonparentindex),2]=None
                self.elements[self.find_pointer(commonparentindex),3]=None
                mask = np.ones(len(self.elements), dtype=bool)
                mask[[self.find_pointer(constantindex),self.find_pointer(constantindex1)]] = False
                result = self.elements[mask]
                self.elements=result
            else:
                self.elements[self.find_pointer(constantindex),1]=str(multiplicand*multiplicand1)
                if find_parent(find_parent(constantindex1))!=999:
                    if self.elements[self.find_pointer(find_parent(constantindex1)),2]==constantindex1:
                        brotherindex=self.elements[self.find_pointer(find_parent(constantindex1)),3]
                    else:
                        brotherindex=self.elements[self.find_pointer(find_parent(constantindex1)),2]
                    if self.elements[self.find_pointer(find_parent(find_parent(constantindex1))),2]==find_parent(constantindex1):
                        self.elements[self.find_pointer(find_parent(find_parent(constantindex1))),2]=brotherindex
                    else:
                        self.elements[self.find_pointer(find_parent(find_parent(constantindex1))),3]=brotherindex
                mask = np.ones(len(self.elements), dtype=bool)
                mask[[self.find_pointer(constantindex1),self.find_pointer(find_parent(constantindex1))]] = False
                result = self.elements[mask]
                self.elements=result
                    
                
    def add_constants(self):
        simple=self.simplify()
        x=simple.find("add constants")
        if x>-1:
            depth_needed=int(simple[x-2])
        else:
            return False
        
        def find_parent(index):
            for e in self.elements:
                print(e,index)
                if e[2]==index or e[3]==index:
                    return e[0]
            return 999

        for e in self.elements:
            commonparentindex=None
            if e[1][-1].isdigit():
                for e1 in self.elements:
                    constantindex=None
                    constantindex1=None
                    commonparentindex=None
                    if e[0]!=e1[0] and e1[1][-1].isdigit():
                        pt=[e[0]]
                        pt1=[e1[0]]
                        while find_parent(pt[-1])!=999 and self.elements[self.find_pointer(find_parent(pt[-1])),1]=="+":
                            pt.append(self.elements[self.find_pointer(find_parent(pt[-1])),0])
                        while find_parent(pt1[-1])!=999 and self.elements[self.find_pointer(find_parent(pt1[-1])),1]=="+":
                            pt1.append(self.elements[self.find_pointer(find_parent(pt1[-1])),0])
                        for p in pt:
                            for p1 in pt1:
                                print(p,p1,p==p1)
                                if p==p1:
                                    constantindex=pt[0]
                                    constantindex1=pt1[0]
                                    commonparentindex=p
                                    break
                            if commonparentindex is not None:
                                break
                        if commonparentindex is not None:
                            break
                    if commonparentindex is not None:
                        break
                if commonparentindex is not None:
                    break
        
        print(constantindex,constantindex1,commonparentindex)
        print(pt,pt1)
        if constantindex is not None and constantindex1 is not None:
            addend=int(self.elements[self.find_pointer(constantindex),1])
            addend1=int(self.elements[self.find_pointer(constantindex1),1])
            
            if commonparentindex==find_parent(constantindex) and commonparentindex==find_parent(constantindex1):     
                self.elements[self.find_pointer(commonparentindex),1]=str(addend+addend1)
                self.elements[self.find_pointer(commonparentindex),2]=None
                self.elements[self.find_pointer(commonparentindex),3]=None
                mask = np.ones(len(self.elements), dtype=bool)
                print([self.find_pointer(constantindex),self.find_pointer(constantindex1)])
                mask[[self.find_pointer(constantindex),self.find_pointer(constantindex1)]] = False
                result = self.elements[mask]
                self.elements=result
            else:
                self.elements[self.find_pointer(constantindex),1]=str(addend+addend1)
                if find_parent(find_parent(constantindex1))!=999:
                    if self.elements[self.find_pointer(find_parent(constantindex1)),2]==constantindex1:
                        brotherindex=self.elements[self.find_pointer(find_parent(constantindex1)),3]
                    else:
                        brotherindex=self.elements[self.find_pointer(find_parent(constantindex1)),2]
                    if self.elements[self.find_pointer(find_parent(find_parent(constantindex1))),2]==find_parent(constantindex1):
                        self.elements[self.find_pointer(find_parent(find_parent(constantindex1))),2]=brotherindex
                    else:
                        self.elements[self.find_pointer(find_parent(find_parent(constantindex1))),3]=brotherindex
                mask = np.ones(len(self.elements), dtype=bool)
                mask[[self.find_pointer(constantindex1),self.find_pointer(find_parent(constantindex1))]] = False
                result = self.elements[mask]
                self.elements=result

        

    def add_expressions(self):
        
        def find_expression(index,e_i):
            print("index="+str(index))
            expression=''
            indices=[find_parent(index)]
            if self.elements[self.find_pointer(index), 1]=='*':
                leftindex=self.elements[self.find_pointer(index), 2]
                rightindex=self.elements[self.find_pointer(index), 3]
                expression=expression+find_expression(self.elements[self.find_pointer(index), 2],'e')
                expression=expression+find_expression(self.elements[self.find_pointer(index), 3],'e')
                indices.extend(find_expression(self.elements[self.find_pointer(index), 2],'i'))
                indices.extend(find_expression(self.elements[self.find_pointer(index), 3],'i'))
            elif self.elements[self.find_pointer(index), 1].islower():
                expression=expression+self.elements[self.find_pointer(index), 1]
            elif self.elements[self.find_pointer(index), 1][-1].isdigit():
                expression=expression+'K'
            else:
                return 'brackets'
            if e_i=='e':
                print("expression="+expression)
                return expression
            elif e_i=='i':
                result=[]
                for n in indices:
                    unique=True
                    for m in result:
                        if n==m:
                            unique=False
                    if unique and n!=999:
                        result.append(n)
                print("result="+str(result))
                return result


        def find_parent(index):
            for e in self.elements:
                if e[2]==index or e[3]==index:
                    return e[0]
            return 999


        simple=self.simplify()
        x=simple.find("add expressions")
        if x>-1:
            depth_needed=int(simple[x-2])
        else:
            return False

        expressions=[]
        indices=[]
        for e in self.elements:
            print(e[0],self.find_depth(e[0]),depth_needed)
            if e[1]=="+" and self.find_depth(e[0])==depth_needed:
                if self.elements[self.find_pointer(e[2]),1]=="*" or self.elements[self.find_pointer(e[2]),1].islower():
                    if find_expression(e[2],'e').find('brackets')==-1 and find_expression(e[2],'e').count('K')<2:
                        expressions.append(find_expression(e[2],'e'))
                        indices.append(find_expression(e[2],'i'))
                if self.elements[self.find_pointer(e[3]),1]=="*" or self.elements[self.find_pointer(e[3]),1].islower():
                    if find_expression(e[3],'e').find('brackets')==-1 and find_expression(e[3],'e').count('K')<2:
                        expressions.append(find_expression(e[3],'e'))
                        indices.append(find_expression(e[3],'i'))
        print(expressions)
        print(indices)



        addends_found=False
        for i in range(0,len(expressions)-1):
            for j in range(i+1,len(expressions)):
                print(sorted(expressions[i].replace("K","")),sorted(expressions[j].replace("K","")))
                if len(expressions[i])>0 and len(expressions[j])>0 and sorted(expressions[i].replace("K",""))==sorted(expressions[j].replace("K","")):
                    addends_found=True
                    break
            if addends_found:
                break

        if addends_found:
            print(expressions[i],expressions[j],indices[i],indices[j])

            if expressions[j].count("K")>0:
                for ind in indices[j]:
                    if self.elements[self.find_pointer(ind),1]=="*":
                        if self.elements[self.find_pointer(self.elements[self.find_pointer(ind),2]), 1][-1].isdigit():
                            constantindex2=self.elements[self.find_pointer(ind),2]
                            constant2=self.elements[self.find_pointer(self.elements[self.find_pointer(ind),2]), 1]
                        elif self.elements[self.find_pointer(self.elements[self.find_pointer(ind),3]), 1][-1].isdigit():
                            constantindex2=self.elements[self.find_pointer(ind),3]
                            constant2=self.elements[self.find_pointer(self.elements[self.find_pointer(ind),3]), 1]

            else:
                varindex=999
                for ind in indices[j]:
                    if self.elements[self.find_pointer(self.elements[self.find_pointer(ind),2]), 1]==expressions[j][0]:
                        varindex=self.elements[self.find_pointer(ind),2]
                    elif self.elements[self.find_pointer(self.elements[self.find_pointer(ind),3]), 1]==expressions[j][0]:
                        varindex=self.elements[self.find_pointer(ind),3]
                    elif self.elements[self.find_pointer(ind),1]==expressions[j][0]:
                        varindex=ind

                if varindex!=999:
                    self.add_subbranch(varindex,'*','1')
                    indices[j].append(varindex)
                    constantindex2=self.elements[self.find_pointer(varindex),3]
                    constant2='1'
                else:
                    print("ERROR: can't find anywhere on LHS to add a constant.")
                    return False


            print(constantindex2,constant2)        
            print(expressions[i],expressions[j],indices[i],indices[j])



            if expressions[i].count("K")>0:
                for ind in indices[i]:
                    if self.elements[self.find_pointer(ind),1]=="*":
                        if self.elements[self.find_pointer(self.elements[self.find_pointer(ind),2]), 1][-1].isdigit():
                            constantindex1=self.elements[self.find_pointer(ind),2]
                            constant1=self.elements[self.find_pointer(self.elements[self.find_pointer(ind),2]), 1]
                        elif self.elements[self.find_pointer(self.elements[self.find_pointer(ind),3]), 1][-1].isdigit():
                            constantindex1=self.elements[self.find_pointer(ind),3]
                            constant1=self.elements[self.find_pointer(self.elements[self.find_pointer(ind),3]), 1]
            else:
                varindex=999
                for ind in indices[i]:
                    if self.elements[self.find_pointer(self.elements[self.find_pointer(ind),2]), 1]==expressions[i][0]:
                        varindex=self.elements[self.find_pointer(ind),2]
                    elif self.elements[self.find_pointer(self.elements[self.find_pointer(ind),3]), 1]==expressions[i][0]:
                        varindex=self.elements[self.find_pointer(ind),3]
                    elif self.elements[self.find_pointer(ind),1]==expressions[i][0]:
                        varindex=ind

                if varindex!=999:
                    self.add_subbranch(varindex,'*','1')
                    indices[i].append(varindex)
                    constantindex1=self.elements[self.find_pointer(varindex),3]
                    constant1='1'
                else:
                    print("ERROR: can't find anywhere on LHS to add a constant.")
                    return False

            print(constantindex1,constant1)            
            print(constantindex2,constant2)
            print(expressions[i],expressions[j],indices[i],indices[j])

            self.elements[self.find_pointer(constantindex1)][1]=str(int(constant1)+int(constant2))
            self.elements[self.find_pointer(constantindex2)][1]='0'
            self.tidy_up()


        else:
            return False
        
        
        
    def cancel(self):
        def find_parent(index):
            for e in self.elements:
                if e[2]==index or e[3]==index:
                    return e[0]
            return 999

        def find_expression(index,e_i):
            expression=''
            indices=[find_parent(index)]
            if self.elements[self.find_pointer(index), 1]=='*':
                leftindex=self.elements[self.find_pointer(index), 2]
                rightindex=self.elements[self.find_pointer(index), 3]
                expression=expression+find_expression(leftindex,'e')
                expression=expression+find_expression(rightindex,'e')
                indices.extend(find_expression(leftindex,'i'))
                indices.extend(find_expression(rightindex,'i'))
            elif self.elements[self.find_pointer(index), 1].islower():
                expression=expression+self.elements[self.find_pointer(index), 1]
            elif self.elements[self.find_pointer(index), 1][-1].isdigit():
                expression=expression+"*"+self.elements[self.find_pointer(index), 1]+"*"
            elif self.elements[self.find_pointer(index), 1]=="/":
                expression=expression+"over"
            else:
                expression='brackets'
            if e_i=='e':
                return expression
            elif e_i=='i':
                result=[]
                for n in indices:
                    unique=True
                    for m in result:
                        if n==m:
                            unique=False
                    if unique and n!=999 and self.elements[self.find_pointer(n), 1]!='+':
                        result.append(n)
                return result
            
        if self.simplify().find("cancel")==-1:
            return False
            
        for e in self.elements:
            if e[1]=="/":
                e1=e
                p=find_parent(e[0])
                print(e[0],p)
                while find_parent(p)!=999 and self.elements[self.find_pointer(find_parent(p)),1]=="*":
                    p=find_parent(p)
                 
                numerator=find_expression(p,'e').replace("brackets","").replace("over","").split("*")
                print(numerator)
                denominator=find_expression(e[2],'e').replace("brackets","").replace("over","").split("*")
                print(denominator)
        print(numerator,denominator)
        topK=1
        bottomK=1
        commonK=1
        topL=''
        bottomL=''
        commonL=''
        for x in numerator:
            if x=='':
                print(x)
            elif x[-1].isdigit():
                topK=topK*int(x)
            elif x.islower():
                topL=topL+x
        for x in denominator:
            if x=='':
                print(x)
            elif x[-1].isdigit():
                bottomK=bottomK*int(x)
            elif x.islower():
                bottomL=bottomL+x
                
        commonK=int(math.gcd(topK,bottomK))
        
        for t in topL:
            if bottomL.find(t)>-1:
                bottomL=bottomL.replace(t,"",1)
                commonL=commonL+t
                print(t,bottomL,commonL)

        print(numerator,denominator, topK, bottomK,commonK,topL,bottomL,commonL)
        commonLcopy=commonL
        setcommon=False
        print("p=",p)
        print("find_expression(p, 'i')=",find_expression(p, 'i'))
        for n in find_expression(p, 'i'):
            print("n=",n)
            leftindex=self.elements[self.find_pointer(n),2]
            rightindex=self.elements[self.find_pointer(n),3]
            print("left=",self.elements[self.find_pointer(leftindex),1])
            if self.elements[self.find_pointer(leftindex),1][-1].isdigit():
                if int(self.elements[self.find_pointer(leftindex),1])<0:
                    self.elements[self.find_pointer(leftindex),1]='-1'
                elif int(self.elements[self.find_pointer(leftindex),1])>0:
                    self.elements[self.find_pointer(leftindex),1]='1'
                if not setcommon:
                    self.elements[self.find_pointer(leftindex),1]=str(int(topK/commonK))
                    setcommon=True
            print("right=",self.elements[self.find_pointer(rightindex),1])
            if self.elements[self.find_pointer(rightindex),1][-1].isdigit()  and leftindex!=rightindex:
                if int(self.elements[self.find_pointer(rightindex),1])<0:
                    self.elements[self.find_pointer(rightindex),1]='-1'
                elif int(self.elements[self.find_pointer(rightindex),1])>0:
                    self.elements[self.find_pointer(rightindex),1]='1'
                if not setcommon:
                    self.elements[self.find_pointer(rightindex),1]=str(int(topK/commonK))
                    setcommon=True
        print(find_expression(p, 'e'))
        setcommon=False
        for n in find_expression(e1[2], 'i'):
            leftindex=self.elements[self.find_pointer(n),2]
            rightindex=self.elements[self.find_pointer(n),3]
            if self.elements[self.find_pointer(leftindex),1][-1].isdigit():
                if int(self.elements[self.find_pointer(leftindex),1])<0:
                    self.elements[self.find_pointer(leftindex),1]='-1'
                elif int(self.elements[self.find_pointer(leftindex),1])>0:
                    self.elements[self.find_pointer(leftindex),1]='1'
                if not setcommon:
                    self.elements[self.find_pointer(leftindex),1]=str(int(bottomK/commonK))
                    setcommon=True
            if self.elements[self.find_pointer(rightindex),1][-1].isdigit()  and leftindex!=rightindex:
                if int(self.elements[self.find_pointer(rightindex),1])<0:
                    self.elements[self.find_pointer(rightindex),1]='-1'
                elif int(self.elements[self.find_pointer(rightindex),1])>0:
                    self.elements[self.find_pointer(rightindex),1]='1'
                if not setcommon:
                    self.elements[self.find_pointer(rightindex),1]=str(int(bottomK/commonK))
                    setcommon=True

        print("e1[2] e",find_expression(e1[2], 'e'),"e1[2] i", find_expression(e1[2], 'i'))

        for n in find_expression(p, 'i'):
            leftindex=self.elements[self.find_pointer(n),2]
            rightindex=self.elements[self.find_pointer(n),3]
            if self.elements[self.find_pointer(leftindex),1].islower():
                if commonLcopy.find(self.elements[self.find_pointer(leftindex),1])>-1:
                    commonLcopy=commonLcopy.replace(self.elements[self.find_pointer(leftindex),1],"",1)
                    self.elements[self.find_pointer(leftindex),1]='1'
            if self.elements[self.find_pointer(rightindex),1].islower()  and leftindex!=rightindex:
                if commonLcopy.find(self.elements[self.find_pointer(rightindex),1])>-1:
                    commonLcopy=commonLcopy.replace(self.elements[self.find_pointer(rightindex),1],"",1)
                    self.elements[self.find_pointer(rightindex),1]='1'
        print(find_expression(p, 'e'))
        for n in find_expression(e1[2], 'i'):
            leftindex=self.elements[self.find_pointer(n),2]
            rightindex=self.elements[self.find_pointer(n),3]
            if self.elements[self.find_pointer(leftindex),1].islower():
                if commonL.find(self.elements[self.find_pointer(leftindex),1])>-1:
                    commonL=commonL.replace(self.elements[self.find_pointer(leftindex),1],"",1)
                    self.elements[self.find_pointer(leftindex),1]='1'
            if self.elements[self.find_pointer(rightindex),1].islower()  and leftindex!=rightindex:
                if commonL.find(self.elements[self.find_pointer(rightindex),1])>-1:
                    commonL=commonL.replace(self.elements[self.find_pointer(rightindex),1],"",1)
                    self.elements[self.find_pointer(rightindex),1]='1'
        print(find_expression(e1[2], 'e'))
        
        simple=self.simplify()
        x=simple.find("cancel brackets")
        if x>-1:
            y=simple[:x].rfind("[")
            z=simple[:y].rfind("[")
            m=int(simple[y+1:x-1])
            n=int(simple[z+1:y-1])
            print(n,m)
            eliminate=[]
            p=n
            while p!=n or self.elements[self.find_pointer(p),3] not in eliminate:
                leftindex=self.elements[self.find_pointer(p),2]
                rightindex=self.elements[self.find_pointer(p),3]
                if leftindex is not None and leftindex not in eliminate:
                    eliminate.append(leftindex)
                    p=leftindex
                elif rightindex is not None and rightindex not in eliminate:
                    eliminate.append(rightindex)
                    p=rightindex
                else:
                    p=find_parent(p)
            p=m
            while p!=m or self.elements[self.find_pointer(p),3] not in eliminate:
                leftindex=self.elements[self.find_pointer(p),2]
                rightindex=self.elements[self.find_pointer(p),3]
                if leftindex is not None and leftindex not in eliminate:
                    eliminate.append(leftindex)
                    p=leftindex
                elif rightindex is not None and rightindex not in eliminate:
                    eliminate.append(rightindex)
                    p=rightindex
                else:
                    p=find_parent(p)
            self.elements[self.find_pointer(n),1]='1'
            self.elements[self.find_pointer(n),2]=None
            self.elements[self.find_pointer(n),3]=None
            self.elements[self.find_pointer(m),1]='1'
            self.elements[self.find_pointer(m),2]=None
            self.elements[self.find_pointer(m),3]=None
            mask = np.ones(len(self.elements), dtype=bool)
            pointers=[]
            for x in eliminate:
                pointers.append(self.find_pointer(x))
            mask[pointers] = False
            result = self.elements[mask]
            self.elements=result
            
            
    def factorise_selected(self, factor, selectedNodes):
        print("factorise_selected")
        def find_parent(index):
            for e in self.elements:
                if e[2]==index or e[3]==index:
                    return e[0]
            return 999
        
        
        def to_top(node):
            parent_chain=[node]
            while find_parent(node)!=999:
                node=find_parent(node)
                parent_chain.append(node)
            return parent_chain
        
    
        
        def dist(n1,n2):
            pc1=set(to_top(n1))
            pc2=set(to_top(n2))

            l1=len(pc1.difference(pc2))
            l2=len(pc2.difference(pc1))

            return l1+l2
        
        
        
        def valid_chain(n1,n2):
            pc1=to_top(n1) 
            pc2=to_top(n2) 

            chain=''
            CP=None
            idx=pc1[0]
            while idx!=pc2[0]:
                if self.elements[self.find_pointer(idx)][1] in ('+','*','/'):
                    chain=chain+self.elements[self.find_pointer(idx)][1]
                if not idx in pc2:
                    idx=pc1[pc1.index(idx)+1]
                else:
                    if CP is None:
                        CP=self.elements[self.find_pointer(idx)][1]
                    idx=pc2[pc2.index(idx)-1]
            valid=re.search(r"^[*]*[+]+[*]*$", chain)

            if CP=='+' and valid is not None:
                return True
            else:
                return False
            

            
        #find candidate leafs in selectednodes
        candidatenodes=[]
        for n in selectedNodes:
            if factor.islower():
                if self.elements[self.find_pointer(n)][1]==factor:
                    candidatenodes.append(n)
            elif self.elements[self.find_pointer(n)][1][-1].isdigit():
                if int(self.elements[self.find_pointer(n)][1]) % int(factor)==0:
                    candidatenodes.append(n)

        print(candidatenodes)

        #pairwise ordering by distance
        mindist=1000
        factorpair=None
        for n in candidatenodes:
            for m in candidatenodes:
                if dist(n,m)>0 and dist(n,m)<mindist and valid_chain(m,n):
                    factorpair=(n,m)
                    mindist=dist(n,m)
        print(factorpair)
        
        if factorpair is None:
            return False

        #locate s,s1
        s=factorpair[0]
        while self.elements[self.find_pointer(find_parent(s))][1]=='*':
            s=find_parent(s)
        s1=factorpair[1]
        while self.elements[self.find_pointer(find_parent(s1))][1]=='*':
            s1=find_parent(s1)
        
        #create new subtree
        minindex=self.elements[:,0].min()
        newnode1=[minindex-1,'*',minindex-2,minindex-3]
        newnode2=[minindex-2,factor,None,None]
        newnode3=[minindex-3,'+',s,s1]
        newnode4=[minindex-4,'0',None,None]

        #alter values of factor nodes
        if factor.islower():
            self.elements[self.find_pointer(factorpair[0])][1]='1'
            self.elements[self.find_pointer(factorpair[1])][1]='1'
        else:
            self.elements[self.find_pointer(factorpair[0])][1]=str(int(int(self.elements[self.find_pointer(factorpair[0])][1])/int(factor)))
            self.elements[self.find_pointer(factorpair[1])][1]=str(int(int(self.elements[self.find_pointer(factorpair[1])][1])/int(factor)))

        #repoint old tree
        if self.elements[self.find_pointer(find_parent(s))][2]==s:
            self.elements[self.find_pointer(find_parent(s))][2]=minindex-1
        else:
            self.elements[self.find_pointer(find_parent(s))][3]=minindex-1
        if self.elements[self.find_pointer(find_parent(s1))][2]==s1:
            self.elements[self.find_pointer(find_parent(s1))][2]=minindex-4
        else:
            self.elements[self.find_pointer(find_parent(s1))][3]=minindex-4

        #splice together
        oldelements=self.elements
        newelements=[newnode1,newnode2,newnode3,newnode4]
        self.elements=np.concatenate((oldelements,newelements), axis=0)


              
            
    def factorise(self):
        def find_parent(index):
            for e in self.elements:
                if e[2]==index or e[3]==index:
                    return e[0]
            return 999
        
        def find_leaf(index):
            if self.elements[self.find_pointer(index), 2] is None:
                return self.elements[self.find_pointer(index), 0]
            elif self.elements[self.find_pointer(index), 1]=='*':
                if find_leaf(self.elements[self.find_pointer(index), 2]) is not None:
                    return find_leaf(self.elements[self.find_pointer(index), 2])
                elif find_leaf(self.elements[self.find_pointer(index), 3]) is not None:
                    return find_leaf(self.elements[self.find_pointer(index), 3])
                else:
                    return None
     
        for e in self.elements:
            if e[1]=="+":
                print(e)
                
                if self.elements[self.find_pointer(e[2]),1]=="*" or self.elements[self.find_pointer(e[3]),1]=="*":
                    topnode=e[0]
                    leftleaves='' 
                    rightleaves='' 
                    visitedleftnodes=[] 
                    visitedrightnodes=[] 
                    p=self.elements[self.find_pointer(e[2]),0]
                    while p not in visitedleftnodes and p!=e[0]:
                        print(p) 
                        if self.elements[self.find_pointer(p),2] is None:
                            leftleaves=leftleaves+self.elements[self.find_pointer(p),1]+","
                            visitedleftnodes.append(self.elements[self.find_pointer(p),0])
                            print(leftleaves) 
                            if self.elements[self.find_pointer(find_parent(p)),2]==p:
                                visitedleftnodes.append(find_parent(p))
                                print(visitedleftnodes) 
                                if find_parent(p)!=e[0]:
                                    p=self.elements[self.find_pointer(find_parent(p)),3]
                            else:
                                p=find_parent(p)
                                while p in visitedleftnodes:
                                    p=find_parent(p)
                        elif self.elements[self.find_pointer(p),1] in ('+','/'):
                            visitedleftnodes.append(p)
                            print(visitedleftnodes)
                            p=find_parent(p)
                            while p in visitedleftnodes:
                                p=find_parent(p)
                        elif self.elements[self.find_pointer(p),2] not in visitedleftnodes:
                            p=self.elements[self.find_pointer(p),2]
                        elif self.elements[self.find_pointer(p),3] not in visitedleftnodes:
                            visitedleftnodes.append(p)
                            print(visitedleftnodes)
                            p=self.elements[self.find_pointer(p),3]
                        else:
                            p=find_parent(p)
                            while p in visitedleftnodes:
                                p=find_parent(p)

                    p=self.elements[self.find_pointer(e[3]),0]
                    while p not in visitedrightnodes and p!=e[0]:
                        print(p)
                        if self.elements[self.find_pointer(p),2] is None:
                            visitedrightnodes.append(self.elements[self.find_pointer(p),0])
                            rightleaves=rightleaves+self.elements[self.find_pointer(p),1]+","
                            print(rightleaves)
                            if self.elements[self.find_pointer(find_parent(p)),2]==p:
                                visitedrightnodes.append(find_parent(p))
                                print(visitedrightnodes)
                                if find_parent(p)!=e[0]:
                                    p=self.elements[self.find_pointer(find_parent(p)),3]
                            else:
                                p=find_parent(p)
                                while p in visitedrightnodes:
                                    p=find_parent(p)
                        elif self.elements[self.find_pointer(p),1] in ('+','/'):
                            visitedrightnodes.append(p)
                            print(visitedrightnodes)
                            p=find_parent(p)
                            while p in visitedrightnodes:
                                p=find_parent(p)
                        elif self.elements[self.find_pointer(p),2] not in visitedrightnodes:
                            p=self.elements[self.find_pointer(p),2]
                        elif self.elements[self.find_pointer(p),3] not in visitedrightnodes:
                            visitedrightnodes.append(p)
                            print(visitedrightnodes)
                            p=self.elements[self.find_pointer(p),3]
                        else:
                            p=find_parent(p)
                            while p in visitedrightnodes:
                                p=find_parent(p)
                    
                
                                
                    print(leftleaves,rightleaves)

                    lefties=leftleaves.split(",")
                    righties=rightleaves.split(",")
                    leftK=1
                    rightK=1
                    commonvar=''
                    for n in lefties:
                        print(n)
                        if len(n)>0 and n[-1].isdigit():
                            leftK=leftK*int(n)

                    for m in righties:
                        print(m)
                        if len(m)>0 and m[-1].isdigit():
                            rightK=rightK*int(m)


                    for n in lefties:
                        if len(n)>0 and n.islower() and commonvar.find(n)==-1:
                            x=leftleaves.count(n)
                            y=rightleaves.count(n)
                            for i in range(0,min(x,y)):
                                commonvar=commonvar+n

                    print(leftleaves,rightleaves,leftK, rightK, commonvar, topnode)

                    p=find_parent(topnode)
                    commonK=int(math.gcd(leftK,rightK))

                    if commonK>1 or len(commonvar)>=1:
                        setK=False
                        commonvar_l=commonvar
                        commonvar_r=commonvar
                        for n in visitedleftnodes:
                            if self.elements[self.find_pointer(n),1][-1].isdigit() :
                                if not setK:
                                    self.elements[self.find_pointer(n),1]=str(int(leftK/commonK))
                                    setK=True
                                else:
                                    self.elements[self.find_pointer(n),1]='1'
                            elif self.elements[self.find_pointer(n),1].islower() :
                                if commonvar_l.find(self.elements[self.find_pointer(n),1])>-1:
                                    commonvar_l=commonvar_l.replace(self.elements[self.find_pointer(n),1],"",1)
                                    self.elements[self.find_pointer(n),1]='1'

                        setK=False

                        for n in visitedrightnodes:
                            if self.elements[self.find_pointer(n),1][-1].isdigit():
                                if not setK:
                                    self.elements[self.find_pointer(n),1]=str(int(rightK/commonK))
                                    setK=True
                                else:
                                    self.elements[self.find_pointer(n),1]='1'
                            elif self.elements[self.find_pointer(n),1].islower() :
                                if commonvar_r.find(self.elements[self.find_pointer(n),1])>-1:
                                    commonvar_r=commonvar_r.replace(self.elements[self.find_pointer(n),1],"",1)
                                    self.elements[self.find_pointer(n),1]='1'


                        if find_parent(topnode)==999:
                            if commonK>1:
                                self.add_branch('*',str(commonK))
                            if len(commonvar)>0:
                                for x in commonvar:
                                    self.add_branch('*',x)
                        else:
                            minindex=self.elements[:,0].min()
                            p=find_parent(topnode)
                            if self.elements[self.find_pointer(p), 2]==topnode:
                                self.elements[self.find_pointer(p), 2]=minindex-1
                            if self.elements[self.find_pointer(p), 3]==topnode:
                                self.elements[self.find_pointer(p), 3]=minindex-1
                            nodes=[[minindex-1, '*', minindex-2, topnode]]
                            subtract=2
                            if len(commonvar)>0:
                                nodes.append([minindex-subtract,'*',minindex-subtract-1,minindex-subtract-2 ])
                                nodes.append([minindex-subtract-1,str(commonK),None,None])
                                subtract=subtract+2
                                for x in range(0,len(commonvar)):
                                    if x<len(commonvar)-1:
                                        nodes.append([minindex-subtract,'*',minindex-subtract-1,minindex-subtract-2 ])
                                        nodes.append([minindex-subtract-1,commonvar[x],None,None])
                                        subtract=subtract+2
                                    else:
                                        nodes.append([minindex-subtract,commonvar[x],None,None])
                            if commonK>1:
                                nodes.append([minindex-subtract,str(commonK),None,None])
                            newelements=np.array(nodes)
                            oldelements=self.elements
                            self.elements=np.concatenate((oldelements,newelements), axis=0)

                        break
    
            
           

    def expand_brackets(self):
        
        def find_parent(index):
            for e in self.elements:
                if e[2]==index or e[3]==index:
                    return e[0]
            return 999
        
        def find_leaf(index):
            if self.elements[self.find_pointer(index), 2] is None:
                return self.elements[self.find_pointer(index), 0]
            elif self.elements[self.find_pointer(index), 1]=='*':
                if find_leaf(self.elements[self.find_pointer(index), 2]) is not None:
                    return find_leaf(self.elements[self.find_pointer(index), 2])
                elif find_leaf(self.elements[self.find_pointer(index), 3]) is not None:
                    return find_leaf(self.elements[self.find_pointer(index), 3])
                else:
                    return None
        
        def copy_tree(node):
            copy=np.array([self.elements[self.find_pointer(node)].copy()])
            n=node

            while (self.elements[self.find_pointer(n)][2] is not None and self.elements[self.find_pointer(n)][2] not in copy[:,0] ) or (self.elements[self.find_pointer(n)][3] is not None and self.elements[self.find_pointer(n)][3] not in copy[:,0] ):

                while self.elements[self.find_pointer(n)][2] is not None:

                    n=self.elements[self.find_pointer(n)][2]
                    copy=np.concatenate((copy, np.array([self.elements[self.find_pointer(n)].copy()])), axis=0)
                while n!=node and self.elements[self.find_pointer(find_parent(n))][2]==n:

                    e=self.elements[self.find_pointer(find_parent(n))]
                    if e[2]==n and e[3] is not None and e[3]!=n:
                        n=e[3]

                        copy=np.concatenate((copy, np.array([self.elements[self.find_pointer(n)].copy()])), axis=0)
                    else:

                        n=find_parent(n)
            return copy
        
        translation_f=self.translate_flat()
        translation=self.translate()
        result=self.print_tree('r')
        output=self.print_tree('o')
        requireddepth=None
        for e in translation_f:
            if e.find("brackets")>=0 and e.rfind("*constant")>e.find("brackets"):
                requireddepth=int(e[1])
            elif e.find("constant*")>=0 and e.rfind("brackets")>e.find("constant*"):
                requireddepth=int(e[1])
            elif e.find("brackets")>=0 and e.rfind("*")>e.find("brackets") and e[e.rfind("*")+1].islower():
                requireddepth=int(e[1])
            elif e.find("*")>=0 and e.rfind("brackets")>e.find("*") and e[e.find("*")-1].islower():
                requireddepth=int(e[1])
        if requireddepth is None:
            return False
        
        candidatepairs=[]
        for e in self.elements:
            if find_parent(e[0]) != 999:
                print(e[1], self.elements[self.find_pointer(find_parent(e[0])),1], self.find_depth(e[0]), requireddepth)
                if e[1]=='+' and self.elements[self.find_pointer(find_parent(e[0])),1]=="*" and self.find_depth(e[0])==requireddepth+1:
                    if find_leaf(find_parent(e[0])) is not None:
                        if find_leaf(e[2]) is not None and find_leaf(e[3]) is not None:
                            candidatepairs.append((e,self.elements[self.find_pointer(find_parent(e[0]))]))
                        elif find_leaf(e[2]) is not None and find_leaf(e[3]) is None:
                            candidatepairs.append((e,self.elements[self.find_pointer(find_parent(e[0]))]))
                        elif find_leaf(e[2]) is None and find_leaf(e[3]) is not None:
                            candidatepairs.append((e,self.elements[self.find_pointer(find_parent(e[0]))]))
                
        print(candidatepairs)
        for p in candidatepairs:
            e=p[0]
            e1=p[1]
            if find_leaf(e[2]) is not None and find_leaf(e[3]) is not None:
                break
                
        if len(candidatepairs)==0:
            for e in self.elements:
                if find_parent(e[0]) != 999:
                    print(e[1], self.elements[self.find_pointer(find_parent(e[0])),1], self.find_depth(e[0]), requireddepth)
                    if e[1]=='+' and self.elements[self.find_pointer(find_parent(e[0])),1]=="*" and self.elements[self.find_pointer(find_parent(e[0])),2]==e[0] and self.find_depth(e[0])==requireddepth+1:
                        e1 = self.elements[self.find_pointer(self.elements[self.find_pointer(find_parent(e[0])),3])]
                        if e1[1]=='+':
                            candidatetriple=[e,self.elements[self.find_pointer(find_parent(e[0]))], e1]
                

        if len(candidatepairs)>0:
            minindex=self.elements[:,0].min()
            newelement1=[1000-1,'*',1000-2, None]
            newelement2=[1000-2, '', None, None]
            leaf=find_leaf(e1[0])
            multiplier=self.elements[self.find_pointer(leaf),1]
            usenewelements=True
            if find_leaf(e[2]) is not None and find_leaf(e[3]) is not None:
                usenewelements=False
                self.add_subbranch(find_leaf(e[2]), "*", multiplier)
                self.add_subbranch(find_leaf(e[3]), "*", multiplier)
            elif find_leaf(e[2]) is not None and find_leaf(e[3]) is None:
                self.add_subbranch(find_leaf(e[2]), "*", multiplier)
                newelement2[1]=multiplier
                newelement1[3]=e[3]
                e[3]=1000-1
            elif find_leaf(e[2]) is None and find_leaf(e[3]) is not None:
                self.add_subbranch(find_leaf(e[3]), "*", multiplier)
                newelement2[1]=multiplier
                newelement1[3]=e[2]
                e[2]=1000-1
            mask = np.ones(len(self.elements), dtype=bool)
            twig=find_parent(leaf)
            if self.elements[self.find_pointer(twig),2]==leaf:
                twighanded='left'
            else:
                twighanded='right'
            branch=find_parent(twig)
            if branch!=999:
                if self.elements[self.find_pointer(branch),2]==twig:
                    branchhanded='left'
                else:
                    branchhanded='right'
                if branchhanded=='left' and twighanded=='left':
                    self.elements[self.find_pointer(branch),2]=self.elements[self.find_pointer(twig),3]
                    if self.elements[self.find_pointer(branch),1]=='/':
                        self.elements[self.find_pointer(branch),3]=self.elements[self.find_pointer(branch),2]
                elif branchhanded=='left' and twighanded=='right':
                    self.elements[self.find_pointer(branch),2]=self.elements[self.find_pointer(twig),2]
                    if self.elements[self.find_pointer(branch),1]=='/':
                        self.elements[self.find_pointer(branch),3]=self.elements[self.find_pointer(branch),2]
                elif branchhanded=='right' and twighanded=='left':
                    self.elements[self.find_pointer(branch),3]=self.elements[self.find_pointer(twig),3]
                    if self.elements[self.find_pointer(branch),1]=='/':
                        self.elements[self.find_pointer(branch),2]=self.elements[self.find_pointer(branch),3]
                elif branchhanded=='right' and twighanded=='right':
                    self.elements[self.find_pointer(branch),3]=self.elements[self.find_pointer(twig),2]
                    if self.elements[self.find_pointer(branch),1]=='/':
                        self.elements[self.find_pointer(branch),2]=self.elements[self.find_pointer(branch),3]


            mask[[self.find_pointer(leaf),self.find_pointer(twig)]] = False
            result = self.elements[mask]
            self.elements=result

            if usenewelements:
                minindex=self.elements[:,0].min()
                newelement1[0]=minindex-1
                newelement1[2]=minindex-2
                newelement2[0]=minindex-2
                if e[3]==1000-1:
                    self.elements[self.find_pointer(e[0]), 3]=minindex-1
                if e[2]==1000-1:
                    self.elements[self.find_pointer(e[0]), 2]=minindex-1

                self.elements=np.concatenate((self.elements,[newelement1,newelement2]), axis=0)
                
        elif len(candidatetriple)>0:
            el=candidatetriple[0]
            ep=candidatetriple[1]
            er=candidatetriple[2]
            el_l_copy=copy_tree(el[2])
            el_r_copy=copy_tree(el[3])
            er_l_copy=copy_tree(er[2])
            er_r_copy=copy_tree(er[3])

            minindex=self.elements[:,0].min()
            maxindex=self.elements[:,0].max()
            el_l_minindex=el_l_copy[:,0].min()
            el_l_maxindex=el_l_copy[:,0].max()
            el_r_minindex=el_r_copy[:,0].min()
            el_r_maxindex=el_r_copy[:,0].max()
            er_l_minindex=er_l_copy[:,0].min()
            er_l_maxindex=er_l_copy[:,0].max()
            er_r_minindex=er_r_copy[:,0].min()
            er_r_maxindex=er_r_copy[:,0].max()


            ep[1]='+'
            el[2]=minindex-1
            el[3]=minindex-2
            er[2]=minindex-3
            er[3]=minindex-4
            minindex=minindex-4

            el_l_offset=el_l_maxindex-minindex+1
            minindex=el_l_minindex-el_l_offset
            el_r_offset=el_r_maxindex-minindex+1
            minindex=el_r_minindex-el_r_offset
            er_l_offset=er_l_maxindex-minindex+1
            minindex=er_l_minindex-er_l_offset
            er_r_offset=er_r_maxindex-minindex+1
            minindex=er_r_minindex-er_r_offset

            multnode_el_l=[el[2],'*',el_l_maxindex, er_l_maxindex]
            multnode_el_r=[el[3],'*',el_l_maxindex-el_l_offset, er_r_maxindex]
            multnode_er_l=[er[2],'*',el_r_maxindex, er_l_maxindex-er_l_offset]
            multnode_er_r=[er[3],'*',el_r_maxindex-el_r_offset, er_r_maxindex-er_r_offset]
            mult_exp=Expression()
            mult_exp.elements=[multnode_el_l,multnode_el_r, multnode_er_l, multnode_er_r]
            print(mult_exp.elements)
            for n in el_l_copy:
                n[0]=n[0]-el_l_offset
                if n[2] is not None:
                    n[2]=n[2]-el_l_offset
                    n[3]=n[3]-el_l_offset
            for n in el_r_copy:
                n[0]=n[0]-el_r_offset
                if n[2] is not None:
                    n[2]=n[2]-el_r_offset
                    n[3]=n[3]-el_r_offset
            for n in er_l_copy:
                n[0]=n[0]-er_l_offset
                if n[2] is not None:
                    n[2]=n[2]-er_l_offset
                    n[3]=n[3]-er_l_offset
            for n in er_r_copy:
                n[0]=n[0]-er_r_offset
                if n[2] is not None:
                    n[2]=n[2]-er_r_offset
                    n[3]=n[3]-er_r_offset
            self.elements=np.concatenate((self.elements,mult_exp.elements,
                                                         el_l_copy, el_r_copy, er_l_copy, er_r_copy), axis=0)
            for e in self.elements:
                e[0]=int(e[0])
                if e[2] is not None:
                    e[2]=int(e[2])
                    e[3]=int(e[3])    

        #make sure top element is maximally indexed
        p=self.elements[0][0]
        while find_parent(p)!=999:
            p=find_parent(p)
        if p<self.elements[:,0].max():
            self.elements[self.find_pointer(p)][0]=self.elements[:,0].max()+1
         
            

   
    def tidy_up(self):
        
        def find_parent(index):
            for e in self.elements:
                if e[2]==index or e[3]==index:
                    return e[0]
            return 999
        
        def parent_chain(node):
            parent_chain=[node]
            while find_parent(node)!=999 and self.elements[self.find_pointer(find_parent(node))][1]==self.elements[self.find_pointer(node)][1]:
                node=find_parent(node)
                parent_chain.append(node)
            return parent_chain

        def family_tree(node):
            pc=parent_chain(node)
            family_tree=set(pc)
            for e in self.elements:
                pc1=parent_chain(e[0])

                if pc1[-1]==pc[-1] and pc1.count(pc[0])==0:
                    family_tree.update(pc1)
            return family_tree

        def left_tree(node):
            e=self.elements[self.find_pointer(node)]
            pc=parent_chain(node)
            left_tree=set(pc)

            added=True
            while added:
                to_add=set()
                for n in left_tree:
                    e1=self.elements[self.find_pointer(n)]
                    if self.elements[self.find_pointer(e1[2])][1]==e[1]:
                        to_add.add(self.elements[self.find_pointer(e1[2])][0])
                        
                    if len(parent_chain(e1[0]))>1 and self.elements[self.find_pointer(parent_chain(e1[0])[-2])][0]==self.elements[self.find_pointer(parent_chain(e1[0])[-1])][2]:
                        if self.elements[self.find_pointer(e1[3])][1]==e[1]:
                            to_add.add(self.elements[self.find_pointer(e1[3])][0])
                            
                if to_add.intersection(left_tree)==to_add:
                    added=False
                else:
                    added=True
                left_tree.update(to_add)
            return left_tree

        
        #swap any adjascent leafs that are in wrong order
        for e in self.elements:
            swap=False
            swapvertical='no'
            if e[1] in ('+','*'):
                if self.elements[self.find_pointer(e[2]), 1][-1].isdigit():
                    lefttype='digit'
                elif self.elements[self.find_pointer(e[2]), 1].islower():
                    lefttype='variable'
                else:
                    lefttype='node'
                if self.elements[self.find_pointer(e[3]), 1][-1].isdigit():
                    righttype='digit'
                elif self.elements[self.find_pointer(e[3]), 1].islower():
                    righttype='variable'
                else:
                    righttype='node'
            #for multiplication nodes, order from l-r digit,variable,bracket       
            if e[1]=="*":      
                if lefttype!='digit':
                    if righttype=='digit':
                        swap=True
                    elif lefttype=='variable' and righttype=='variable':
                        if self.elements[self.find_pointer(e[3]), 1]<self.elements[self.find_pointer(e[2]), 1]:
                            swap=True
                    elif lefttype=='node' and righttype!='node':
                        swap=True
                            
            #for addition nodes, order brackets/vars/digits
            elif e[1]=="+":      
                if lefttype!='node':
                    if lefttype=='variable' and righttype=='variable':
                        if self.elements[self.find_pointer(e[3]), 1]<self.elements[self.find_pointer(e[2]), 1]:
                            swap=True
                    elif lefttype=='digit' and righttype!='digit':
                        swap=True
                    elif righttype=='node':
                        swap=True
            if swap:

                leftindex=e[2]
                rightindex=e[3]
                e[3]=leftindex
                e[2]=rightindex

        
        #swap non-adjascent leafs that can be profitably swapped
        for e in self.elements:
            print(self.elements)
            print(e)
            if e[1]=='*' or e[1]=='+':
                swapped=False
                e_lefttype='non-leaf'
                e_righttype='non-leaf'
                if self.elements[self.find_pointer(e[2])][1][-1].isdigit():
                    e_lefttype='digit'
                if self.elements[self.find_pointer(e[3])][1][-1].isdigit():
                    e_righttype='digit'
                if self.elements[self.find_pointer(e[2])][1].islower():
                    e_lefttype='var'
                if self.elements[self.find_pointer(e[3])][1].islower():
                    e_righttype='var'
                if (self.elements[self.find_pointer(e[2])][1]=='+' and e[1]=='*')  or (self.elements[self.find_pointer(e[2])][1]=='*' and e[1]=='+') or self.elements[self.find_pointer(e[2])][1]=='/':
                    e_lefttype='bracket'
                if (self.elements[self.find_pointer(e[3])][1]=='+'  and e[1]=='*') or (self.elements[self.find_pointer(e[3])][1]=='*'  and e[1]=='+') or self.elements[self.find_pointer(e[3])][1]=='/':
                    e_righttype='bracket'
                print(e_lefttype)
                print(e_righttype)
                ft=family_tree(e[0])
                lt=left_tree(e[0])
                lt.difference_update([e[0]])
                print(lt)
                if lt:
                    for n in lt:
                        
                        print(n)
                        swap='none'
                        e1=self.elements[self.find_pointer(n)]
                        e1_lefttype='non-leaf'
                        e1_righttype='non-leaf'
                        if (self.elements[self.find_pointer(e1[2])][1]=='+' and e1[1]=='*') or (self.elements[self.find_pointer(e1[2])][1]=='*' and e1[1]=='+') or self.elements[self.find_pointer(e1[2])][1]=='/':
                            e1_lefttype='bracket'
                        if (self.elements[self.find_pointer(e1[3])][1]=='+' and e1[1]=='*') or (self.elements[self.find_pointer(e1[3])][1]=='*' and e1[1]=='+') or self.elements[self.find_pointer(e1[3])][1]=='/':
                            e1_righttype='bracket'
                        if self.elements[self.find_pointer(e1[2])][1][-1].isdigit():
                            e1_lefttype='digit'
                        if self.elements[self.find_pointer(e1[3])][1][-1].isdigit():
                            e1_righttype='digit'
                        if self.elements[self.find_pointer(e1[2])][1].islower():
                            e1_lefttype='var'
                        if self.elements[self.find_pointer(e1[3])][1].islower():
                            e1_righttype='var'
                        print(e1_lefttype)
                        print(e1_righttype)


                        #for multiplication nodes, order from l-r digit,variable,bracket 
                        if e[1]=='*' and not swapped:
                            if e_righttype=='digit':
                                if e1_lefttype=='var' or e1_lefttype=='bracket':
                                    swap='er-e1l'
                                elif e1_righttype=='var' or e1_righttype=='bracket':
                                    swap='er-e1r'
                            elif e_righttype=='var':
                                if e1_lefttype=='bracket':
                                    swap='er-e1l'
                                elif e1_lefttype=='var' and self.elements[self.find_pointer(e1[2])][1]>self.elements[self.find_pointer(e[3])][1]:
                                    swap='er-e1l'
                                elif e1_righttype=='bracket':
                                    swap='er-e1r'
                                elif e1_righttype=='var' and self.elements[self.find_pointer(e1[3])][1]>self.elements[self.find_pointer(e[3])][1]:
                                    swap='er-e1r'

                            if e_lefttype=='digit':
                                if e1_lefttype=='var' or e1_lefttype=='bracket':
                                    swap='el-e1l'
                                elif e1_righttype=='var' or e1_righttype=='bracket':
                                    swap='el-e1r'
                            elif e_lefttype=='var':
                                if e1_lefttype=='bracket':
                                    swap='el-e1l'
                                elif e1_lefttype=='var' and self.elements[self.find_pointer(e1[2])][1]>self.elements[self.find_pointer(e[2])][1]:
                                    swap='el-e1l'
                                elif e1_righttype=='bracket':
                                    swap='el-e1r'
                                elif e1_righttype=='var' and self.elements[self.find_pointer(e1[3])][1]>self.elements[self.find_pointer(e[2])][1]:
                                    swap='el-e1r'
                        #for addition nodes, order brackets/vars/digits
                        if e[1]=='+' and not swapped:
                            if e_righttype=='bracket':
                                if e1_lefttype=='var' or e1_lefttype=='digit':
                                    swap='er-e1l'
                                elif e1_righttype=='var' or e1_righttype=='digit':
                                    swap='er-e1r'
                            elif e_lefttype=='var':
                                if e1_lefttype=='digit':
                                    swap='el-e1l'
                                elif e1_lefttype=='var' and self.elements[self.find_pointer(e1[2])][1]>self.elements[self.find_pointer(e[2])][1]:
                                    swap='el-e1l'
                                elif e1_righttype=='digit':
                                    swap='el-e1r'
                                elif e1_righttype=='var' and self.elements[self.find_pointer(e1[3])][1]>self.elements[self.find_pointer(e[2])][1]:
                                    swap='el-e1r'

                            if e_lefttype=='bracket':
                                if e1_lefttype=='var' or e1_lefttype=='digit':
                                    swap='el-e1l'
                                elif e1_righttype=='var' or e1_righttype=='digit':
                                    swap='el-e1r'
                            elif e_righttype=='var':
                                if e1_lefttype=='digit':
                                    swap='er-e1l'
                                elif e1_lefttype=='var' and self.elements[self.find_pointer(e1[2])][1]>self.elements[self.find_pointer(e[3])][1]:
                                    swap='er-e1l'
                                elif e1_righttype=='digit':
                                    swap='er-e1r'
                                elif e1_righttype=='var' and self.elements[self.find_pointer(e1[3])][1]>self.elements[self.find_pointer(e[3])][1]:
                                    swap='er-e1r'

                        leftnode=e[2]
                        rightnode=e[3]
                        leftnode1=e1[2]
                        rightnode1=e1[3]
                        print(swap)
                        print(swapped)
                        if swap=='el-e1l' and not swapped:
                            e1[2]=leftnode
                            e[2]=leftnode1
                            swapped=True
                        elif swap=='el-e1r' and not swapped:
                            e1[3]=leftnode
                            e[2]=rightnode1
                            swapped=True
                        elif swap=='er-e1l' and not swapped:
                            e1[2]=rightnode
                            e[3]=leftnode1
                            swapped=True
                        elif swap=='er-e1r' and not swapped:
                            e1[3]=rightnode
                            e[3]=rightnode1
                            swapped=True
                            
        #swap any subtrees that have lower precedence elements
        for e in self.elements:    
            if e[1] in ('+','*'):
                swap=False
                

                lefthasbracket=False
                righthasbracket=False
                lefthasvar=False
                righthasvar=False
                lefthasconst=False
                righthasconst=False
                treedone=False
                e1=e
                

                while not treedone:
                    
                    if e1[1]=='+' and e1[0]!=e[0]:
                        lefthasbracket=True
                    elif e1[1]=='/' and e1[0]!=e[0]:
                        lefthasbracket=True
                    elif e1[1].islower():
                        lefthasvar=True
                    elif e1[1][-1].isdigit():
                        lefthasconst=True
                    if self.find_pointer(e1[2]) is not None and not lefthasbracket:
                        e1=self.elements[self.find_pointer(e1[2])]
                        print("A")
                        print(e1)

                    else:
                        cont=True
                        while cont and find_parent(e1[0])!=999 and e1[0]!=e[0]:
                            if self.elements[self.find_pointer(find_parent(e1[0]))][2]==e1[0]:
                                cont=False
                                e1=self.elements[self.find_pointer(find_parent(e1[0]))]
                                print("B")
                                print(e1)
                                if e1[0]==e[0]:
                                    treedone=True
                                e1=self.elements[self.find_pointer(e1[3])]
                                print("B")
                                print(e1)
                            elif e1[0]!=e[0]:
                                e1=self.elements[self.find_pointer(find_parent(e1[0]))]
                                print("C")
                                print(e1)
                                if e1[0]==e[0]:
                                    treedone=True
                            else:
                                cont=False

                print("lefthasbracket="+str(lefthasbracket))
                print("lefthasvar="+str(lefthasvar))
                print("lefthasconst="+str(lefthasconst))
                treedone=False
                if e[3] is not None:
                    e1=self.elements[self.find_pointer(e[3])]
                else:
                    treedone=True
                while not treedone:
                    if e1[1]=='+':
                        righthasbracket=True
                    elif e1[1]=='/':
                        righthasbracket=True
                    elif e1[1].islower():
                        righthasvar=True
                    elif e1[1][-1].isdigit():
                        righthasconst=True
                    if self.find_pointer(e1[2]) is not None and not righthasbracket:
                        e1=self.elements[self.find_pointer(e1[2])]
                        print("A")
                        print(e1)
                    else:
                        cont=True
                        while cont and find_parent(e1[0])!=999 and e1[0]!=e[0]:
                            if self.elements[self.find_pointer(find_parent(e1[0]))][2]==e1[0] and self.elements[self.find_pointer(find_parent(e1[0]))][3]!=e1[0]:
                                cont=False
                                e1=self.elements[self.find_pointer(find_parent(e1[0]))]
                                print("B")
                                print(e1)
                                if e1[0]==e[0]:
                                    treedone=True
                                e1=self.elements[self.find_pointer(e1[3])]
                                print("B")
                                print(e1)
                            elif e1[0]!=e[0]:
                                e1=self.elements[self.find_pointer(find_parent(e1[0]))]
                                print("C")
                                print(e1)
                                if e1[0]==e[0]:
                                    treedone=True
                            else:
                                cont=False


                print("righthasbracket="+str(righthasbracket))
                print("righthasvar="+str(righthasvar))
                print("righthasconst="+str(righthasconst))
                swap=False
                #for multiplication nodes, order from l-r digit,variable,bracket
                if not righthasbracket and lefthasbracket and e[1]=='*':
                    swap=True
                elif not righthasvar and not righthasbracket and lefthasvar and e[1]=='*':
                    swap=True
                elif righthasconst and not righthasvar and not righthasbracket and e[1]=='*':
                    swap=True
                #for addition nodes, order brackets/vars/digits
                if not lefthasbracket and righthasbracket and e[1]=='+':
                    swap=True
                elif not lefthasvar and not lefthasbracket and righthasvar and e[1]=='+':
                    swap=True
                elif not lefthasvar and not lefthasbracket and righthasconst and e[1]=='+':
                    swap=True
                if swap:
                    leftindex=e[2]
                    rightindex=e[3]
                    e[3]=leftindex
                    e[2]=rightindex
                print(self.elements)
                            
        for e in self.elements:

            tidied=False
            i=0
            while not tidied and i<len(self.elements):
                print(i)
                e=self.elements[i]
                mask = np.ones(len(self.elements), dtype=bool)
                eliminate=[]
                if e[1]=='0':
                    if find_parent(e[0])!=999:
                        p=find_parent(e[0])
                        #unity case: 0+()=()
                        if self.elements[self.find_pointer(p),1]=="+" and not tidied:
                            print("0+()=()")
                            eliminate.append(self.find_pointer(e[0]))
                            eliminate.append(self.find_pointer(p))
                            if self.elements[self.find_pointer(p),2]==e[0]:
                                phanded='left'
                            else:
                                phanded='right'
                            if find_parent(p)!=999:
                                pp=find_parent(p)
                                if self.elements[self.find_pointer(pp),2]==p:
                                    pphanded='left'
                                else:
                                    pphanded='right'
                            else:
                                pphanded=None

                            if pphanded is not None:
                                if pphanded=='left' and phanded=='left':
                                    self.elements[self.find_pointer(pp),2]=self.elements[self.find_pointer(p),3]
                                elif pphanded=='left' and phanded=='right':
                                    self.elements[self.find_pointer(pp),2]=self.elements[self.find_pointer(p),2]
                                elif pphanded=='right' and phanded=='left':
                                    self.elements[self.find_pointer(pp),3]=self.elements[self.find_pointer(p),3]
                                elif pphanded=='right' and phanded=='right':
                                    self.elements[self.find_pointer(pp),3]=self.elements[self.find_pointer(p),2]
                            print(eliminate)
                            mask[eliminate] = False
                            result = self.elements[mask]
                            self.elements=result
                            tidied=True

                        #error case: 1/0->"Divide by zero!"

                        if not tidied and self.elements[self.find_pointer(p),1]=="/":
                            print("dividebyzeroB")
                            raise ZeroDivisionError("Second argument to a division or modulo operation was zero.")
                            tidied=True



                        #unity case: 0*()=0
                        if not tidied and self.elements[self.find_pointer(p),1]=="*":
                            print("0*()=0")
                            cl=self.elements[self.find_pointer(p),2]
                            cr=self.elements[self.find_pointer(p),3]
                            if cl==e[0]:
                                while cr is not None:
                                    #eliminate.append(self.find_pointer(cl))
                                    eliminate.append(self.find_pointer(cr))
                                    p=cr
                                    cl=self.elements[self.find_pointer(p),2]
                                    cr=self.elements[self.find_pointer(p),3]
                                    while cl is not None:
                                        eliminate.append(self.find_pointer(cl))
                                        eliminate.append(self.find_pointer(cr))
                                        if self.elements[self.find_pointer(cl),2] is None:
                                            eliminate.append(self.find_pointer(self.elements[self.find_pointer(p),3]))
                                        p=cl
                                        cl=self.elements[self.find_pointer(p),2]
                            elif cr==e[0]:
                                while cl is not None:
                                    eliminate.append(self.find_pointer(cl))
                                    #eliminate.append(self.find_pointer(cr)
                                    p=cl
                                    cl=self.elements[self.find_pointer(p),2]
                                    cr=self.elements[self.find_pointer(p),3]
                                    while cr is not None:
                                        eliminate.append(self.find_pointer(cl))
                                        eliminate.append(self.find_pointer(cr))
                                        if self.elements[self.find_pointer(cr),3] is None:
                                            eliminate.append(self.find_pointer(self.elements[self.find_pointer(p),2]))
                                        p=cr
                                        cr=self.elements[self.find_pointer(p),3]
                            print(eliminate)
                            p=find_parent(e[0])
                            if self.elements[self.find_pointer(p),2]==e[0]:
                                phanded='left'
                            elif self.elements[self.find_pointer(p),3]==e[0]:
                                phanded='right'
                            pp=find_parent(p)
                            if pp!=999:
                                ppp=find_parent(pp)
                                if self.elements[self.find_pointer(pp),2]==p:
                                    pphanded='left'
                                elif self.elements[self.find_pointer(pp),3]==p:
                                    pphanded='right'                                
                            else:
                                ppp=999
                            print(e[0],p,pp,ppp)
                            if ppp!=999:
                                if self.elements[self.find_pointer(ppp),2]==pp:
                                    ppphanded='left'
                                elif self.elements[self.find_pointer(ppp),3]==pp:
                                    ppphanded='right' 
                            if pp==999:
                                eliminate.append(self.find_pointer(p))
                            else:
                                if self.elements[self.find_pointer(pp),1]=="/":
                                    eliminate.append(self.find_pointer(p))
                                    self.elements[self.find_pointer(pp),2]=e[0]
                                    self.elements[self.find_pointer(pp),3]=e[0]
                                    print("ERROR: divide by 0 in expression!")
                                elif self.elements[self.find_pointer(pp),1]=="*":
                                    print("pp=*")
                                    eliminate.append(self.find_pointer(p))
                                    if pphanded=='left':
                                        self.elements[self.find_pointer(pp),2]=e[0]
                                    elif pphanded=='right':
                                        self.elements[self.find_pointer(pp),3]=e[0]
                                elif self.elements[self.find_pointer(pp),1]=="+":
                                    print("pp=+")
                                    eliminate.append(self.find_pointer(p))
                                    eliminate.append(self.find_pointer(e[0]))
                                    eliminate.append(self.find_pointer(pp))
                                    if ppp!=999:
                                        print("ppp!=999")
                                        if ppphanded=='left' and pphanded=='left':
                                            self.elements[self.find_pointer(ppp),2]=self.elements[self.find_pointer(pp),3]
                                        elif ppphanded=='left' and pphanded=='right':
                                            self.elements[self.find_pointer(ppp),2]=self.elements[self.find_pointer(pp),2] 
                                        elif ppphanded=='right' and pphanded=='left':
                                            self.elements[self.find_pointer(ppp),3]=self.elements[self.find_pointer(pp),3] 
                                        elif ppphanded=='right' and pphanded=='right':
                                            self.elements[self.find_pointer(ppp),3]=self.elements[self.find_pointer(pp),2] 
                            print(eliminate)
                            mask[eliminate] = False
                            result = self.elements[mask]
                            self.elements=result
                            tidied=True

                if e[1]=='1':
                    if find_parent(e[0])!=999:
                        p=find_parent(e[0])
                        #unity case: 1*()=()
                        if not tidied and self.elements[self.find_pointer(p),1]=="*":
                            if self.elements[self.find_pointer(p),2]==e[0]:
                                phanded='left'
                                otherchildindex=self.elements[self.find_pointer(p),3]
                            elif self.elements[self.find_pointer(p),3]==e[0]:
                                phanded='right'
                                otherchildindex=self.elements[self.find_pointer(p),2]

                            pp=find_parent(p)

                            if not(pp==999 and self.elements[self.find_pointer(otherchildindex),1]=='/'):
                                if pp!=999:
                                    if self.elements[self.find_pointer(pp),2]==p:
                                        self.elements[self.find_pointer(pp),2]=otherchildindex
                                    if self.elements[self.find_pointer(pp),3]==p:
                                        self.elements[self.find_pointer(pp),3]=otherchildindex

                                eliminate.append(self.find_pointer(self.elements[self.find_pointer(e[0]),0]))
                                eliminate.append(self.find_pointer(self.elements[self.find_pointer(p),0]))
                                mask[eliminate] = False
                                result = self.elements[mask]
                                self.elements=result
                                tidied=True
                        #unity case: ()/1=()
                        if not tidied and self.elements[self.find_pointer(p),1]=="/":
                            self.elements[self.find_pointer(p),1]='1'
                            self.elements[self.find_pointer(p),2]=None
                            self.elements[self.find_pointer(p),3]=None
                            eliminate.append(self.find_pointer(e[0]))
                            mask[eliminate] = False
                            result = self.elements[mask]
                            self.elements=result
                            tidied=True


                i=i+1
                
          #make sure top element is maximally indexed
            p=self.elements[0][0]
            while find_parent(p)!=999:
                p=find_parent(p)
            if p<self.elements[:,0].max():
                self.elements[self.find_pointer(p)][0]=self.elements[:,0].max()+1 
                        
       
