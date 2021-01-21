var upheight = -window.innerHeight/4;
var annotations = [
  {
    type:d3.annotationCalloutElbow,
    note: {
        label: "Trump launches presidential campaign"
    },
    data:{
        x: "2015-06-16 15:57:23",
        y: 10619

    },
    color: ["black"],
    dx:50,
    dy:-50
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Size",
      label: "The size of the circle indicates the number of retweets"
  },
  data:{
      x: "2015-07-06 01:02:14",
      y: 423
  },
  color: ["black"],
  dx:50,
  dy:-50
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Hover",
      label: "Hover over a tweet to see it in full"
  },
  data:{
      x: "2015-06-24 23:40:47",
      y: 227
  },
  color: ["black"],
  dx:50,
  dy:-50
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Colour",
      label: "The colour indicates whether the tweet is a retweet (green), has been deleted (grey) or has been flagged (red).",
      wrap: 300
  },
  data:{
      x: "2015-06-28 13:51:01",
      y: 423
  },
  color: ["black"],
  dx:50,
  dy:-50
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Wall",
      label: "Trump continues to call for a wall along the southern border, claiming Mexico will pay for it.",
  },
  data:{
      x: "2015-07-02 19:24:12",
      y: 939
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "McCain",
      label: "Trump attacks McCain: 'I like people who weren't captured'.",
  },
  data:{
      x: "2015-07-18 17:58:18",
      y: 575
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Debate",
      label: "After the first Primary debate, Trump attacks Megyn Kelly.",
  },
  data:{
      x: "2015-08-07 07:53:46",
      y: 7846
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Miss Universe",
      label: "After Trump's comments on Immigration NBC along with Ora TV and Grupo Televisa sever ties with Trump.",
  },
  data:{
      x: "2015-09-11 15:31:05",
      y: 4297
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Debate",
      label: "First Democrat primary debate",
  },
  data:{
      x: "2015-10-14 16:31:34",
      y: 5990
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Muslim Immigration",
      label: "Donald Trump calls for Muslim ban",
  },
  data:{
      x: "2015-12-07 22:32:07",
      y: 6158
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Graham",
      label: "Senator Lindsey Graham drops out of presidential primary, endorses Jeb Bush.",
  },
  data:{
      x: "2016-01-15 15:30:38",
      y: 7559
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Fox News",
      label: "Trump declines to participate in Fox News primary debate after confrontations with host Megyn Kelly.",
  },
  data:{
      x: "2016-01-27 13:02:52",
      y: 12399
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Voter Fraud",
      label: "After losing the Iowa Caucus, Trump alleges that Cruz 'stole it'.",
  },
  data:{
      x: "2016-02-03 14:07:25",
      y: 6557
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Jeb!",
      label: "Jeb Bush drops out of primary, endorses Ted Cruz.",
  },
  data:{
      x: "2016-03-23 19:49:49",
      y: 14597
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "New Hampshire",
      label: "Trump wins the New Hampshire primary.",
  },
  data:{
      x: "2016-02-09 04:06:58",
      y: 6849
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Fiorina",
      label: "Ted Cruz picks Carly Fiorina as his running mate.",
  },
  data:{
      x: "2016-04-28 11:31:48",
      y: 15239
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Indiana",
      label: "Trump wins the Indiana priamry, becoming the presumptive Republican nominee.",
  },
  data:{
      x: "2016-05-03 23:38:34",
      y: 32088
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Pocahontas",
      label: "Trump calls Elizabeth Warran 'Pocahontas' for the first time.",
  },
  data:{
      x: "2016-05-25 05:37:29",
      y: 3813
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Emails",
      label: "FBI director recommends no charges against Hilary Clinton.",
  },
  data:{
      x: "2016-07-05 15:39:06",
      y: 63161
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Mike Pence",
      label: "Trump picks Mike Pence as his running mate.",
  },
  data:{
      x: "2016-07-15 14:50:55",
      y: 79700
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Wikileaks",
      label: "Wikileaks release DNC emails.",
  },
  data:{
      x: "2016-07-23 21:20:58",
      y: 29114
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Emails",
      label: "Trump calls on Russia to relase Hillary's emails.",
  },
  data:{
      x: "2016-07-27 16:16:02",
      y: 51601
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Access Hollywood",
      label: "Access Hollywood tape released.",
  },
  data:{
      x: "2016-10-08 04:19:43",
      y: 98305
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Trump wins",
      label: "Trump wins the 2016 election.",
  },
  data:{
      x: "2016-11-08 11:43:14",
      y: 498035
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Womens March",
      label: "The day after Trump is inaugurated four million attend the Women's March.",
  },
  data:{
      x: "2017-01-22 12:47:21",
      y: 182320
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Voter Fraud",
      label: "Trump claims that 3–5 million illegal votes cost him the popular vote.",
  },
  data:{
      x: "2017-01-25 12:10:01",
      y: 110259
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Trump Tower",
      label: "Trump accuses Obama of intercepting communications at Trump Tower during the campaign.",
      wrap: 300
  },
  data:{
      x: "2017-03-04 11:35:20",
      y: 140761

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Gorsuch",
      label: "Neil Gorsuch appointed to Supreme Court.",
      wrap: 300
  },
  data:{
      x: "2017-04-08 19:58:32",
      y: 86136

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Comey",
      label: "Trump fires FBI director James Comey.",
  },
  data:{
      x: "2017-05-10 02:42:52",
      y: 78669

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Covfefe"
  },
  data:{
      x: "2017-05-31 04:06:25",
      y: 162788

  },
  color: ["black"],
  dx:-50,
  dy:-50
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Paris",
      label: "Trump withdraws from the Paris Climate Accord.",
  },
  data:{
      x: "2017-06-01 01:05:17",
      y: 66560

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Cages",
      label: "Trump forced to reverse 'zero-tolerance' immigration policy over child seperations.",
  },
  data:{
      x: "2018-06-20 12:25:17",
      y: 108023

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "McCain",
      label: "McCain returns to senate to vote against the repeal of the Affordable Care Act.",
  },
  data:{
      x: "2017-07-25 10:44:06",
      y: 70910

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Bannon",
      label: "Steve Bannon leaves White House.",
  },
  data:{
      x: "2017-08-19 11:33:51",
      y: 99626

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Charlottesville",
      label: "Trump condemns violence 'on all sides' at Charlottesvile rally.",
  },
  data:{
      x: "2017-08-12 17:19:13",
      y: 164760

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Migration",
      label: "In response to a terorist attack in NYC, Trump calls for an end to 'chain migration' for first time.",
  },
  data:{
      x: "2017-11-01 23:03:26",
      y: 63857

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Tax",
      label: "The Senate passes Trump's tax cuts.",
  },
  data:{
      x: "2017-12-20 06:09:06",
      y: 118874

  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Nuclear",
      label: "Trump says his nuclear button is larger than that of Kim Jong-un .",
  },
  data:{
      x: "2018-01-03 00:49:19",
      y: 430222
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Genius",
      label: "Trump declares himself 'a very stable genius' in response to Michael Wolf's book 'Fire and Fury'.",
  },
  data:{
      x: "2018-01-06 12:30:51",
      y: 119593
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Pompeo",
      label: "Mike Pompeo replaces Rex Tillerson as Secretary of State.",
  },
  data:{
      x: "2018-03-13 12:44:33",
      y: 104951
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Jerusalem",
      label: "Israeli US embassy moves to Jerusalem.",
  },
  data:{
      x: "2018-05-14 10:54:15",
      y: 72814
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Brett",
      label: "Brett Kavanaugh appointed to the US Supreme Court.",
  },
  data:{
      x: "2018-10-05 14:59:41",
      y: 171630
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Midterms",
      label: "Republicans lose the house in 2018 midterms.",
  },
  data:{
      x: "2018-11-07 04:14:39",
      y: 219676
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Treason",
      label: "Trump retweets image calling for Rosenstein and Muller to be imprisoned for treason.",
  },
  data:{
      x: "2018-11-28 01:40:18",
      y: 0
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Mueller",
      label: "Mueller report is released.",
  },
  data:{
      x: "2019-04-18 12:54:47",
      y: 124939
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Powell",
      label: "General Flynn hires Sydney Poweel as his lawyer.",
  },
  data:{
      x: "2019-06-13 10:21:50",
      y: 83348
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Go back",
      label: "Trump attacks progressive democrats.",
  },
  data:{
      x: "2019-07-14 12:27:52",
      y: 165089
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Impeachment (1)",
      label: "Nancy Pelosi launches formal impeachment inquiry.",
  },
  data:{
      x: "2019-09-24 18:12:09",
      y: 123007
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Soleimani",
      label: "Trump announces death of Iranian Major General Qasem Soleimani.",
  },
  data:{
      x: "2020-01-03 12:44:30",
      y: 303007
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "COVID-19",
      label: "First victim of COVID-19 reported.",
  },
  data:{
      x: "2020-02-29 17:02:35",
      y: 109825
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Impeachment (1)",
      label: "Trump acquited by the Senate.",
  },
  data:{
      x: "2020-02-05 22:07:04",
      y: 273366
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Bernie",
      label: "Bernie Sanders withdraws from 2020 democratic primary, leaving Biden the presumptive nominee.",
  },
  data:{
      x: "2020-04-08 15:49:28",
      y: 268306
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Liberate",
      label: "Trump calls for 'liberation' in Virginia, Michigan and Minnesota where governers imposed lockdown restrictions.",
  },
  data:{
      x: "2020-04-17 15:21:48",
      y: 163673
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Drink Bleach",
      label: "Trump explains his statement that bleach can kill COVID-19.",
  },
  data:{
      x: "2020-04-25 20:30:42",
      y: 179258
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Bible",
      label: "Trump holds up bible at church after clearing protesters.",
  },
  data:{
      x: "2020-06-02 02:04:34",
      y: 0
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Rigged",
      label: "First time Trump explicitly states that the 2020 election will be rigged because of mail-in ballots.",
  },
  data:{
      x: "2020-06-22 11:16:57",
      y: 239087
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Ginsburg",
      label: "Supreme Court Justice Ruth Bader Ginsburg dies.",
  },
  data:{
      x: "2020-09-19 02:34:33",
      y: 164721
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "COVID-19",
      label: "United States surpasses 200,000 deaths from COVID-19.",
  },
  data:{
      x: "2020-09-22 22:56:06",
      y: 44230
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Amy Barrett",
      label: "Senate confirms Amy Coney Barrett to the Supreme Court.",
  },
  data:{
      x: "2020-10-27 11:54:03",
      y: 279159
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Taxes",
      label: "The New York Times uncovers Trump's tax returns.",
  },
  data:{
      x: "2020-09-28 14:29:36",
      y: 144385
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Covid",
      label: "Trump and Melania contract COVID-19.",
  },
  data:{
      x: "2020-10-02 04:54:06",
      y: 1869706
  },
  color: ["black"],
  dx:50,
  dy:50
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "2020",
      label: "Trump accepts the Republican nomination for the 2020 election.",
  },
  data:{
      x: "2020-08-24 15:25:48",
      y: 114709
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "BLM",
      label: "Trump responds to the Black Lives Matter protests.",
  },
  data:{
      x: "2020-05-29 04:53:14",
      y: 0
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "2020 (1)",
      label: "Joe Biden wins the 2020 US Election.",
  },
  data:{
      x: "2020-11-07 15:36:36",
      y: 1188311
  },
  color: ["black"],
  dx:50,
  dy:-50
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Raffensperger",
      label: "In leaked phone call Trump demands Brad Raffensperger, Georgia Secretary of State, 'find 11,780 votes'.",
  },
  data:{
      x: "2021-01-03 13:57:37",
      y: 198671
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Mob",
      label: "Trump mob overruns capital, Trump refuses to concede.",
  },
  data:{
      x: "2021-01-06 19:38:58",
      y: 582183
  },
  color: ["black"],
  dx:50,
  dy:upheight
},
{
  type:d3.annotationCalloutElbow,
  note: {
      title: "Banned",
      label: "Trump is banned from Twitter.",
  },
  data:{
      x: "2021-01-08 15:44:28",
      y: 510761
  },
  color: ["black"],
  dx:50,
  dy:upheight
}
]
