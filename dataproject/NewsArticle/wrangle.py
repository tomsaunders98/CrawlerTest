import pandas as pd, re


votedata = pd.read_csv("VoteDataNew.csv")



unkown = votedata.loc[votedata["party"] == "Labour (Co-op)"]

name = unkown["name"].values



for n in name:
    party = re.findall("(?<=\().+?(?=\))", n)
    if len(party) > 1:
        party = party[1]
        print(party)
        if party == "Lab" or party == "Lab/Co-op":
            party = "Labour"
        if party == "Con":
            party = "Conservative"
        if party == "LD":
            party = "Liberal Democrat"
        if party == "SNP":
            party = "Scottish National Party"
        if party == "DUP":
            party = "Democratic Unionist Party"
        votedata.loc[votedata["name"] == n, "party"] = party
votedata.to_csv("VoteDataNew.csv")








