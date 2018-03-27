import os
if __name__ == "__main__":
    for i in range(1,11):
        n = str(i)
        m = "BC"
        os.system("java -jar FCBC.jar "+m +" testas"+n+".txt "+"res"+m+n+".txt")
