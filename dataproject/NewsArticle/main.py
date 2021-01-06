import requests, re, json, pandas as pd, numpy as np, sys, logging, tabula, os, random, lxml, html5lib
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from tabula import io
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

def FindParty(members):
    results = []
    for Constituency in members.values.tolist():
        try:
            name = re.sub(r"\((.*?)\)","",Constituency)
            const = re.search(r"\((.*?)\)", Constituency).group(1)
        except:
            results.append("Conservative") # Owen Paterson on 16/9 Bracket missing
            continue
        getConstId = f"http://lda.data.parliament.uk/constituencies.json?label={const}&exists-endedDate=false"
        res = requests.get(getConstId)
        consts = res.json()
        consts = consts["result"]["items"]
        if (len(consts) == 1):
            consid = consts[0]["_about"]
        else:
            results.append("False1")
            continue
        getinfo = f"http://lda.data.parliament.uk/commonsmembers.json?constituency={consid}"
        res = requests.get(getinfo)
        consts = res.json()
        consts = consts["result"]["items"]
        if len(consts) == 1:
            party = consts[0]["party"]["_value"]
            results.append(party)
        else:
            found = False
            for item in consts:
                #print(item["fullName"]["_value"])
                #print(name)
                if (item["fullName"]["_value"] + " ") == name:
                    party = item["party"]["_value"]
                    found = True
                    results.append(party)
            if found == False:
                results.append("Unknown")
        #print("----")
    return results

def FindTwitter(members):
    results = []
    for Constituency in members.values.tolist():
        try:
            name = re.sub(r"\((.*?)\)", "", Constituency)
            const = re.search(r"\((.*?)\)", Constituency).group(1)
        except:
            results.append("Conservative")
            continue
        getConstId = f"http://lda.data.parliament.uk/constituencies.json?label={const}&exists-endedDate=false"
        res = requests.get(getConstId)
        consts = res.json()
        consts = consts["result"]["items"]
        if (len(consts) == 1):
            consid = consts[0]["_about"]
        else:
            results.append("False1")
            continue
        getinfo = f"http://lda.data.parliament.uk/commonsmembers.json?constituency={consid}"
        res = requests.get(getinfo)
        consts = res.json()
        consts = consts["result"]["items"]
        if len(consts) == 1:
            try:
                twitter = consts[0]["twitter"]["_value"]
                results.append(twitter)
            except:
                results.append("No Twitter")

        else:
            found = False
            for item in consts:
                # print(item["fullName"]["_value"])
                # print(name)
                if (item["fullName"]["_value"] + " ") == name:
                    try:
                        twitter = item["twitter"]["_value"]
                        found = True
                        results.append(twitter)
                    except:
                        results.append("No Twitter")
                        found = True
            if found == False:
                results.append("Unknown")
        # print("----")
    return results

class Browse:
    def __init__(self, filepath=None):
        self.opts = webdriver.ChromeOptions()
        self.opts.headless = True
        self.opts.add_argument("--no-sandbox")
        self.filepath = filepath
        if self.filepath == None:
            self.filepath = ""

    def start(self):
        self.browser = webdriver.Chrome(executable_path="driver/chromedriver", options=self.opts)
    def stop(self):
        return self.browser.quit()

    def ClickLink(self, element):
        #element = self.browser.find_element_by_xpath('//a[@href="' + href + '"]')
        return self.browser.execute_script("arguments[0].click();", element)  # Only way to click w/ Python?
    def wait(self):
        clock = random.randint(0, 20)
        return self.browser.implicitly_wait(clock)

    def CycleDivisions(self, href):
        self.browser.get(href)
        titles = self.browser.find_elements_by_class_name("card-section")



        for title in titles:
            MatchObk = re.search("Members Eligible for a Proxy Vote", title.text)
            if (MatchObk != None):
                link = title.get_attribute("href")
                print(link)
                return link
        return False

            # print(titles)
            # ProxyLink = titles.find_element_by_xpath("//*[contains(text(), 'Members Eligible for a Proxy Vote')]")
            # link = ProxyLink.get_attribute("href")
        # except:
        #     try:
        #         self.browser.find_elements_by_class_name("alert-info")
        #         return "weekend"
        #     except:
        #         return False


    def GetVotes(self, href, date):
        self.browser.get(href)
        VoteList = self.browser.find_element_by_class_name("hansardTable").get_attribute("outerHTML")
        if not VoteList:
            print(f"Unable to get results, retrying ")
            Browse.wait(self)
            Browse.GetVotes(self, href)
        proxylist = pd.read_html(VoteList)[0]
        proxylist = proxylist.rename(columns={"Member eligible for proxy vote" : "member", "Nominated proxy" : "whip"})
        proxylist = proxylist.assign(party=lambda x: FindParty(x["member"]),
                                     twitter=lambda x: FindTwitter(x["member"]))
        proxylist[date] = "True"
        proxylist = proxylist.drop('whip', 1)
        return proxylist

        # Votes = VoteList.find_elements_by_xpath(".//tbody/tr")
        # print(f"Found {len(Votes)} Mps Eligible for Proxy Votes")
        # VoteText = VoteList.text
        # whipbag = [len(Votes)]
        # whips = ["Chris Elmore", "Stuart Andrew", "Patrick Grady"]
        # for whip in whips:
        #     if whip == "Chris Elmore":
        #         MatchObj = re.findall(whip, VoteText)
        #         if len(MatchObj) == 0:
        #             MatchObj = re.findall("Mark Tami", VoteText)
        #     if (MatchObj == None):
        #         whipbag.append(0)
        #     else:
        #         print(f"{len(MatchObj)} matches for {whip}")
        #         whipbag.append(len(MatchObj))

def AddData(ProxyTable, ProxyCount):
    cols = ProxyCount.columns.values.tolist()
    date = cols[-1]
    ProxyTable[date] = "False"

    names = ProxyTable["name"].values.tolist()
    Pnames = ProxyCount["member"].values.tolist()
    NotIncNames = [item for item in Pnames if item not in names]
    IncNames = [item for item in Pnames if item in names]
    for name in NotIncNames:
        party = ProxyCount.loc[ProxyCount["member"] == name, "party"].values[0]

        twitter = ProxyCount.loc[ProxyCount["member"] == name, "twitter"].values[0]
        frame = pd.DataFrame({'name': [name], 'party': [party], 'twitter': [twitter], date: ["True"]})
        ProxyTable = pd.concat([ProxyTable, frame], axis=0, ignore_index=True)
    for name in IncNames:
        ProxyTable.loc[ProxyTable["name"] == name, date] = "True"




    # dateC = ProxyTable["date"].values
    # date = bag[1]
    # votes = bag[0][0]
    # labour = bag[0][1]
    # cons = bag[0][2]
    # SNP = bag[0][3]
    # datestring = f'{date:%d}/{date:%m}/{date.year}'
    # votes = int(votes)
    # ProxyTable = ProxyTable.append({"date" : datestring, "vote": votes, "labour" : labour, "cons" : cons, "SNP" : SNP}, ignore_index=True)
    ProxyTable.to_csv("VoteDataNew.csv", index=False)
    return ProxyTable


if __name__ == '__main__':




    finals = pd.bdate_range(start="2020-12-16",end="2021-01-03").tolist()
    Chrome = Browse()
    Chrome.start()
    ProxyTable = pd.read_csv("VoteDataNew.csv")
    for i in finals:
        date = f'{i.year}-{i:%m}-{i:%d}'
        print(f"Attempting page {date}")
        linkbag = Chrome.CycleDivisions(f"https://hansard.parliament.uk/commons/{date}")
        print(linkbag)
        if not linkbag:
            print(f"No Proxy Votes but no alert either on {date}")
            finals.append(i)
            Chrome.wait()
            continue
        if linkbag == "weekend":
            print(f"No Votes on {date} because weekend")
            continue
        else:
            print(f"Loaded page on {date}")
        ProxyCount = Chrome.GetVotes(linkbag,date)
        #bag1 = [ProxyCount, i]
        ProxyTable = AddData(ProxyTable, ProxyCount)
        Chrome.wait()


    Chrome.stop()
