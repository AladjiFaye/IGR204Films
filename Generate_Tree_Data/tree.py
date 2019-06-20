
def prepare(string1,string2,nbr):
    return '{ "name" : "'+string1+'", "parent":"'+string2+'" },'

def fill(Data,name,nbr):
    for i in range(0,len(name)):
        parent_=name[i]+" "+str(i)
        for j in range(0, len(name)):
            if j!=i:
                Data = Data + prepare(name[j]+" "+str(i)+"."+str(j), parent_, nbr)
                parent = name[j]+" "+str(i)+"."+str(j)
                for k in range(0,len(name)):
                    if ((k != i) & (k!=j)):
                        nbr = nbr + 1
                        Data = Data + prepare(name[k]+" "+str(i)+"."+str(j)+"."+str(k), parent, nbr)
                        Data =Data + prepare(name[k]+ "     end",name[k]+" "+str(i)+"."+str(j)+"."+str(k),nbr)
    for i in range(0,len(name)):
        Data = Data + prepare(name[i]+" "+str(i), "Racine", nbr)
    Data = Data + prepare("Racine","",nbr)
    return Data,nbr

treeData = "["
nbr=0
name=['Subject','Title','Length','Year','Actor','Actress','Director','Popularity','Awards']
treeData,nbr=fill(treeData,name,nbr)
treeData=treeData[0:-1]
treeData=treeData+"]"

fichier = open("Tree.txt", "a")
fichier.write(treeData)
fichier.close()
print(treeData)
print(nbr)






